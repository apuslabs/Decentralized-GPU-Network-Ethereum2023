import Web3 from "web3"
import { useState } from "react"
import { AccountContract, HelperContract } from "@/contexts/web3"
import dayjs from "dayjs"
import { Price } from "./api"

export const accountContractAddress = '0x7592A188A064395E54b2E7fE01b5C5554569D111'
export const accountContractABI = [
	{
		"inputs": [],
		"name": "cancellation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_stakeAmount",
				"type": "uint256"
			}
		],
		"name": "offlineUnBlockedFund",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_stakeAmount",
				"type": "uint256"
			}
		],
		"name": "onlineBlockedFund",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "register",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "addr",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "balance",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "providerBlockedFunds",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "recipientBlockedFunds",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "info",
						"type": "string"
					}
				],
				"internalType": "struct AccountFactory.accountInfo",
				"name": "accountinfo",
				"type": "tuple"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_stakeAmount",
				"type": "uint256"
			}
		],
		"name": "rentBlockedFund",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_recipient",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_provider",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_stakeAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_unBlockedAmount",
				"type": "uint256"
			}
		],
		"name": "rentUnBlockedFund",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_info",
				"type": "string"
			}
		],
		"name": "setProviderInfo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "stake",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "unstake",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getAccount",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "addr",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "balance",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "providerBlockedFunds",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "recipientBlockedFunds",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "info",
						"type": "string"
					}
				],
				"internalType": "struct AccountFactory.accountInfo",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "isRegister",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
] as const

export const helperContractAddress = '0x976DE5a7aa0304D9F2F4a90De3A8c7C00629206b'
export const helperContractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_deviceId",
				"type": "uint256"
			}
		],
		"name": "offlineServer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_machineId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_serverInfo",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "serverPrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "storagePrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "upbandWidth",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "downbandWidth",
						"type": "uint256"
					}
				],
				"internalType": "struct Price",
				"name": "_price",
				"type": "tuple"
			},
			{
				"internalType": "uint256",
				"name": "_startTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_endTime",
				"type": "uint256"
			}
		],
		"name": "onlineServer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_leaseId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_endTime",
				"type": "uint256"
			}
		],
		"name": "RenewalLeaseServer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_deviceId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_endTime",
				"type": "uint256"
			}
		],
		"name": "rentServer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_leaseId",
				"type": "uint256"
			}
		],
		"name": "terminateInstance",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_leaseId",
				"type": "uint256"
			}
		],
		"name": "terminateLease",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "leaseId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "expireTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "deviceId",
						"type": "uint256"
					}
				],
				"internalType": "struct leaseInfo",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_accountFactoryAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "account_contract",
		"outputs": [
			{
				"internalType": "contract AccountFactory",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "a",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "b",
				"type": "string"
			}
		],
		"name": "concatenateStrings",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "devices",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "enum DeviceStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "machineId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "serverInfo",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "serverPrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "storagePrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "upbandWidth",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "downbandWidth",
						"type": "uint256"
					}
				],
				"internalType": "struct Price",
				"name": "price",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAll",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "leaseId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "providerBlockedFund",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "recipientBlockedFunds",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "enum billingStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "enum billingType",
						"name": "billType",
						"type": "uint8"
					}
				],
				"internalType": "struct billingInfo[]",
				"name": "",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "leaseId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "providerBlockedFund",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "recipientBlockedFunds",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "enum billingStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "enum billingType",
						"name": "billType",
						"type": "uint8"
					}
				],
				"internalType": "struct billingInfo[]",
				"name": "",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "leaseId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "expireTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "deviceId",
						"type": "uint256"
					}
				],
				"internalType": "struct leaseInfo[]",
				"name": "",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "leaseId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "expireTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "deviceId",
						"type": "uint256"
					}
				],
				"internalType": "struct leaseInfo[]",
				"name": "",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "enum DeviceStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "machineId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "serverInfo",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "serverPrice",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "storagePrice",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "upbandWidth",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "downbandWidth",
								"type": "uint256"
							}
						],
						"internalType": "struct Price",
						"name": "price",
						"type": "tuple"
					}
				],
				"internalType": "struct deviceInfo[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_deviceId",
				"type": "uint256"
			}
		],
		"name": "getDevice",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "enum DeviceStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "machineId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "serverInfo",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "serverPrice",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "storagePrice",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "upbandWidth",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "downbandWidth",
								"type": "uint256"
							}
						],
						"internalType": "struct Price",
						"name": "price",
						"type": "tuple"
					}
				],
				"internalType": "struct deviceInfo",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_deviceId",
				"type": "uint256"
			}
		],
		"name": "getLeaseByDeviceId",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "leaseId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "expireTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "deviceId",
						"type": "uint256"
					}
				],
				"internalType": "struct leaseInfo",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_leaseId",
				"type": "uint256"
			}
		],
		"name": "getProviderBillingByLeaseId",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "leaseId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "providerBlockedFund",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "recipientBlockedFunds",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "enum billingStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "enum billingType",
						"name": "billType",
						"type": "uint8"
					}
				],
				"internalType": "struct billingInfo",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_leaseId",
				"type": "uint256"
			}
		],
		"name": "getRecipientBillingByLeaseId",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "leaseId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "providerBlockedFund",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "recipientBlockedFunds",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "enum billingStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "enum billingType",
						"name": "billType",
						"type": "uint8"
					}
				],
				"internalType": "struct billingInfo",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "leaseProvider",
		"outputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "leaseId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expireTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deviceId",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "leaseRecipient",
		"outputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "leaseId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expireTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deviceId",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_limit",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_offset",
				"type": "uint256"
			}
		],
		"name": "listDevices",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "enum DeviceStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "machineId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "serverInfo",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "serverPrice",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "storagePrice",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "upbandWidth",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "downbandWidth",
								"type": "uint256"
							}
						],
						"internalType": "struct Price",
						"name": "price",
						"type": "tuple"
					}
				],
				"internalType": "struct deviceInfo[]",
				"name": "_allDevices",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_provider",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_limit",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_offset",
				"type": "uint256"
			}
		],
		"name": "listOwnDevices",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "enum DeviceStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "machineId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "serverInfo",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "serverPrice",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "storagePrice",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "upbandWidth",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "downbandWidth",
								"type": "uint256"
							}
						],
						"internalType": "struct Price",
						"name": "price",
						"type": "tuple"
					}
				],
				"internalType": "struct deviceInfo[]",
				"name": "_ownDevices",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "platformSharingRatio",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "providerBillings",
		"outputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "leaseId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "providerBlockedFund",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "recipientBlockedFunds",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "enum billingStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "enum billingType",
				"name": "billType",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_startTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_endTime",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "serverPrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "storagePrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "upbandWidth",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "downbandWidth",
						"type": "uint256"
					}
				],
				"internalType": "struct Price",
				"name": "_price",
				"type": "tuple"
			}
		],
		"name": "providerStakeCalcute",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "recipientBillings",
		"outputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "leaseId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "providerBlockedFund",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "recipientBlockedFunds",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "enum billingStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "enum billingType",
				"name": "billType",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_startTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_endTime",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "serverPrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "storagePrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "upbandWidth",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "downbandWidth",
						"type": "uint256"
					}
				],
				"internalType": "struct Price",
				"name": "_price",
				"type": "tuple"
			}
		],
		"name": "recipientStakeCalcute",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "number",
				"type": "uint256"
			}
		],
		"name": "uintToString",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	}
] as const

export function useStake(contract?: AccountContract) {
	const [isStaking, setIsStaking] = useState(false)
	return {
		stake: (address: string, value: number) => new Promise((resolve, reject) => {
			if (!contract) {
				reject("contract is null")
			}
			setIsStaking(true)
			try {
				contract?.methods.stake().send({
					from: address,
					value: Web3.utils.toWei(value, 'ether')
				}).on('error', (error: any) => {
					reject(error)
				}).on('confirmation', (e) => {
					if (e.receipt.status === BigInt(1)) {
						resolve(e)
					} else {
						reject(e)
					}
				})
			} catch (e) {
				reject(e)
			} finally {
				setIsStaking(false)
			}
		}),
		isStaking
	}
}

export function useUnStake(contract?: AccountContract) {
	const [isUnStaking, setIsUnStaking] = useState(false)
	return {
		unstake: (address: string, value: number) => new Promise((resolve, reject) => {
			if (!contract) {
				reject("contract is null")
			}
			setIsUnStaking(true)
			try {
				contract?.methods.unstake(Web3.utils.toWei(value, 'ether')).send({
					from: address,
				}).on('error', (error: any) => {
					reject(error)
				}).on('confirmation', (e) => {
					if (e.receipt.status === BigInt(1)) {
						resolve(e)
					} else {
						reject(e)
					}
				})
			} catch (e) {
				reject(e)
			} finally {
				setIsUnStaking(false)
			}
		}),
		isUnStaking
	}
}

export function useRent(contract?: HelperContract) {
	const [isRenting, setIsRenting] = useState(false)
	return {
		rent: (address: string, server_id: number, endDate: dayjs.Dayjs) => new Promise((resolve, reject) => {
			if (!contract) {
				reject("contract is null")
			}
			setIsRenting(true)
			try {
				console.log(server_id, endDate.unix(), address)
				contract?.methods.rentServer(server_id, endDate.unix()).send({
					from: address,
				}).on('error', (error: any) => {
					reject(error)
				}).on('confirmation', (e) => {
					if (e.receipt.status === BigInt(1)) {
						resolve(e)
					} else {
						reject(e)
					}
				})
			} catch (e) {
				reject(e)
			} finally {
				setIsRenting(false)
			}
		}),
		isRenting
	}
}

export function useRenewal(contract?: HelperContract) {
	const [isRenewaling, setIsRenewaling] = useState(false)
	return {
		renewal: (address: string, server_id: string, endDate: dayjs.Dayjs) => new Promise((resolve, reject) => {
			if (!contract) {
				reject("contract is null")
			}
			setIsRenewaling(true)
			try {
				console.log(server_id, endDate.unix(), address)
				const endDateUnix = endDate.unix()
				console.log(server_id, endDateUnix, address)
				contract?.methods.RenewalLeaseServer(server_id, endDateUnix).send({
					from: address,
				}).on('error', (error: any) => {
					reject(error)
				}).on('confirmation', (e) => {
					if (e.receipt.status === BigInt(1)) {
						resolve(e)
					} else {
						reject(e)
					}
				})
			} catch (e) {
				reject(e)
			} finally {
				setIsRenewaling(false)
			}
		}),
		isRenewaling
	}
}

export function useTerminateLease(contract?: HelperContract) {
	const [isTerminating, setIsTerminating] = useState(false)
	return {
		terminateLease: (address: string, server_id: string) => {
			return new Promise((resolve, reject) => {
				if (!contract) {
					reject("contract is null")
				}
				setIsTerminating(true)
				try {
					console.log(server_id, address)
					contract?.methods.terminateInstance(server_id).send({
						from: address,
					}).on('error', (error: any) => {
						reject(error)
					}).on('confirmation', (e) => {
						if (e.receipt.status === BigInt(1)) {
							resolve(e)
						} else {
							reject(e)
						}
					})
				} catch (e) {
					reject(e)
				} finally {
					setIsTerminating(false)
				}
			})
		},
		isTerminating
	}
}

export function useUnList(contract?: HelperContract) {
	const [isUnListing, setIsUnListing] = useState(false)
	return {
		unList: (address: string, server_id: number) => new Promise((resolve, reject) => {
			setIsUnListing(true)
			try {
				console.log(server_id, address)
				contract?.methods.offlineServer(server_id).send({
					from: address,
				}).on('error', (error: any) => {
					reject(error)
				}).on('confirmation', (e) => {
					if (e.receipt.status === BigInt(1)) {
						resolve(e)
					} else {
						reject(e)
					}
				})
			} catch (e) {
				reject(e)
			} finally {
				setIsUnListing(false)
			}
		}),
		isUnListing
	}
}

export function useOnline(contract?: HelperContract) {
	const [isOnlining, setIsOnlining] = useState(false)
	return {
		online: async (address: string, server_id: string, server_info: string, price: Price, endDate: dayjs.Dayjs) => {
			try {
				setIsOnlining(true)
				const server_price = Web3.utils.toWei(price.server_price, 'ether')
				const storage_price = Web3.utils.toWei(price.storage_price, 'ether')
				const upband_width = Web3.utils.toWei(price.upband_width, 'ether')
				const downband_width = Web3.utils.toWei(price.downband_width, 'ether')
				return new Promise((resolve, reject) => {
					try {
						console.log(server_id, server_info, {
							serverPrice: server_price,
							storagePrice: storage_price,
							upbandWidth: upband_width,
							downbandWidth: downband_width
						}, address)
						contract?.methods.onlineServer(server_id, server_info, {
							serverPrice: server_price,
							storagePrice: storage_price,
							upbandWidth: upband_width,
							downbandWidth: downband_width
						}, dayjs().unix(), endDate.unix()).send({
							from: address,
						}).on('error', (error: any) => {
							reject(error)
						}).on('confirmation', (e) => {
							if (e.receipt.status === BigInt(1)) {
								resolve(e)
							} else {
								reject(e)
							}
						})
					} catch (e) {
						reject(e)
					}
				})
			} catch (e) {
				return Promise.reject(e)
			} finally {
				setIsOnlining(false)
			}
		},
		isOnlining
	}
}