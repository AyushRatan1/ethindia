import { utils } from "ethers";
import { supabase } from "../supabaseClient"; // Import Supabase client
import contractABI from "./UserProfileABI.json"; // Replace with actual path to ABI JSON

const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";

// Function to connect to blockchain
async function connectToBlockchain() {
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    return { provider, signer };
  } else {
    throw new Error("MetaMask is not installed. Please install MetaMask and try again.");
  }
}

// Function to load the contract
async function loadContract(signerOrProvider) {
  const contract = new ethers.Contract(contractAddress, contractABI, signerOrProvider);
  return contract;
}

// Fetch user profile inputs from Supabase "socials" table
async function fetchSocialsFromSupabase(userId) {
  const { data, error } = await supabase.from("socials").select("*").eq("id", userId).single();
  if (error) {
    throw new Error(`Error fetching data from Supabase: ${error.message}`);
  }
  return data; // Should return an object like { id: "user123", name: "Alice", domain: "Blockchain" }
}

// Store user profile on blockchain using data from Supabase "socials"
export async function storeSocialsFromSupabase(userId) {
  try {
    const socialsData = await fetchSocialsFromSupabase(userId);

    const { name, domain } = socialsData; // Extract the required fields
    const email = ""; // If "email" is not in Supabase, use an empty string or a placeholder
    const { signer } = await connectToBlockchain();
    const contract = await loadContract(signer);

    const transaction = await contract.storeProfile(name, email, domain);
    await transaction.wait();

    console.log("Profile stored successfully using Supabase 'socials' data!");
  } catch (error) {
    console.error("Error storing profile from Supabase:", error.message);
  }
}

// Function to check staked balance (unchanged from previous implementation)
export async function checkStake(userAddress) {
  try {
    const { provider } = await connectToBlockchain();
    const contract = await loadContract(provider);

    const stake = await contract.checkStake(userAddress);
    console.log("Staked balance:", ethers.utils.formatEther(stake));
    return ethers.utils.formatEther(stake);
  } catch (error) {
    console.error("Error checking stake:", error.message);
    return "0";
  }
}

export default 