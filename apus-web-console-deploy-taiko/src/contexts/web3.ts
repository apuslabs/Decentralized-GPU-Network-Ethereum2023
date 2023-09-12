'use client'

import { accountContractABI, accountContractAddress, helperContractABI, helperContractAddress } from "@/constant/contract";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import Web3, { Contract } from "web3";
import useSWR from 'swr'
import { CommonResponse, getFetcher } from "@/utils/fetcher";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";

export const web3Context = createContext<ReturnType<typeof useWeb3Context>>(null!)

export const Web3ContextProvider = web3Context.Provider

export type AccountInfoResponse = {
    /**
     * 用户公钥地址
     */
    address: string;
    /**
     * 用户的金额, 是一个字符串形式的float "1.11", 单位是BNB
     */
    balance: string;
    /**
     * 是否是provider
     */
    is_provider: boolean;
    /**
     * 因provider质押的金额, 格式同balance
     */
    provider_blocked_funds: string;
    /**
     * provider的信息 @jax,  需要提供下
     */
    provider_info: { [key: string]: any };
    info: { [key: string]: any };
    /**
     * 租用机器质押的金额, 格式同balance
     */
    recipient_blocked_funds: string;
}

export type AccountContract = Contract<typeof accountContractABI>
export type HelperContract = Contract<typeof helperContractABI>

export let web3: Web3
export let accountContract: AccountContract
export let helperContract: HelperContract

export function useWeb3Context() {
    const [hasMetamask, setHasMetamask] = useState(false)
    const [account, setAccount] = useState<string>("")
    const [balance, setBalance] = useState<string>("0.")
    const router = useRouter()
    const pathname = usePathname()
    const { data: accountInfo, isLoading, mutate: refreshAccountInfo } = useSWR<CommonResponse<AccountInfoResponse>>(account ? ['/apus/account/info', {
        address: account
    }] : null, getFetcher, {
        onSuccess: (data) => {
            if (data.code === 200 && pathname === '/console/signin') {
                router.push('/console/dashboard/market')
            }
        }
    })
    const [isConnecting, setIsConnecting] = useState(false)

    const initWeb3 = () => {
        if (window.ethereum !== undefined && !web3) {
            web3 = new window.Web3(window.ethereum)
            accountContract = new web3.eth.Contract(accountContractABI, accountContractAddress)
            helperContract = new web3.eth.Contract(helperContractABI, helperContractAddress)
        }
    }

    useEffect(() => {
        if (window.ethereum !== undefined) {
            setHasMetamask(true)
        }
    }, [])

    const initAccount = async (requestAccount?: boolean) => {
        if (window.ethereum !== undefined) {
            try {
                const accounts = await window.ethereum.request({
                    method: requestAccount ? 'eth_requestAccounts' : 'eth_accounts',
                })
                if (!accounts?.length) {
                    return { account: '', balance: '0' }
                }
                const account = Web3.utils.toChecksumAddress(accounts[0])
                setAccount(account)
                const balance = await window.ethereum.request({
                    method: 'eth_getBalance',
                    params: [account, 'latest']
                })
                const etherBalance = Web3.utils.fromWei(balance, 'ether')
                setBalance(etherBalance)
                return {
                    account,
                    balance: etherBalance,
                }
            } catch (e) {
                console.error(e)
            }
        }
        return { account: '', balance: '0' }
    }

    useEffect(() => {
        initAccount()
        window.ethereum.on('accountsChanged', (accounts: string[]) => {
            initAccount()
        });
        return () => {
            window.ethereum.removeAllListeners('accountsChanged')
        }
    }, [])

    const connectMetamask = useCallback(async () => {
        if (web3) {
            setIsConnecting(true)
            try {
                const { account, balance } = await initAccount(true)
                if (Number(balance) <= 0) {
                    toast.error('Your need to have some BNB to register')
                    return
                }
                await accountContract?.methods.register().send({
                    from: account,
                }).on('error', console.error).on('confirmation', (e) => {
                    if (e.receipt.status === BigInt(1)) {
                        toast.success('Sing up successfully')
                        accountContract?.methods?.getAccount
                        refreshAccountInfo()
                    }
                })
            } catch (e) {
                console.error(e)
            } finally {
                setIsConnecting(false)
            }
        }
    }, [refreshAccountInfo, router, web3])

    return {
        initWeb3,
        refreshAccount: initAccount,
        hasMetamask,
        isLogin: accountInfo?.code === 200,
        needLogin: !isLoading && accountInfo?.code === 400,
        connectMetamask,
        account,
        web3,
        accountContract: accountContract,
        helperContract: helperContract,
        balance,
        accountInfo: {
            balance: Web3.utils.fromWei(accountInfo?.data?.balance || '0', 'ether'),
            recipient_blocked_funds: Web3.utils.fromWei(accountInfo?.data?.recipient_blocked_funds || '0', 'ether'),
            provider_blocked_funds: Web3.utils.fromWei(accountInfo?.data?.provider_blocked_funds || '0', 'ether'),
        },
        isProvider: Boolean(accountInfo?.data?.info),
        isConnecting,
        refreshAccountInfo,
    }
}