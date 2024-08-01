import { useAccount, useConnect, useDisconnect, useWriteContract } from "wagmi";
import { TokenAbi } from "./abis/TokenContract";
import { ContractAbi } from "./abis/Contract";
import { parseEther } from "viem";
import { abi } from "./abis/abi";

window.open = (function (open) {
	return function (url, _, features) {
		return open.call(window, url, "_blank", features);
	};
})(window.open);

function App() {
	const account = useAccount();
	const { connectors, connect, status, error } = useConnect();
	const { disconnect } = useDisconnect();

	const mainContract = '0x5B96D1C23d34C301C277aed37261024aEF1456fE';
	const tokenContract = '0xab1a4d4f1d656d2450692d237fdd6c7f9146e814';

	// const { writeContract } = useWriteContract()

	const {
		writeContract: writeContractApprove
	} = useWriteContract();

	const {
		writeContract: writeContractDeposit
	} = useWriteContract();

	const { writeContract } = useWriteContract()

	return (
		<>
			<button
				onClick={() =>
					writeContract({
						abi,
						address: '0x6b175474e89094c44da98b954eedeac495271d0f',
						functionName: 'transferFrom',
						args: [
							'0xd2135CfB216b74109775236E36d4b433F1DF507B',
							'0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
							123n,
						],
					})
				}
			>
				Transfer
			</button>

			<button
				onClick={() =>
					writeContractApprove({
						abi: TokenAbi,
						address: tokenContract,
						functionName: "approve",
						args: [
							mainContract,
							100_000_000_000_000n,
						],
					})
				}
			>Call Approve</button >
			<button
				onClick={() =>
					writeContractDeposit({
						abi: ContractAbi,
						address: mainContract,
						functionName: "deposit",
						args: [100_000_000_000_000n],
					})
				}
			>Call Deposit</button >
			<div>
				<h2>Account</h2>

				<div>
					status: {account.status}
					<br />
					addresses: {JSON.stringify(account.addresses)}
					<br />
					chainId: {account.chainId}
				</div>

				{account.status === "connected" && (
					<button type="button" onClick={() => disconnect()}>
						Disconnect
					</button>
				)}
			</div>

			<div>
				<h2>Connect</h2>
				{connectors.map((connector) => (
					<button
						key={connector.uid}
						onClick={() => connect({ connector })}
						type="button"
					>
						{connector.name}
					</button>
				))}
				<div>{status}</div>
				<div>{error?.message}</div>
			</div>
		</>
	);
}

export default App;
