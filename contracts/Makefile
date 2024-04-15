-include .env

.PHONY: all test clean deploy fund help install snapshot format anvil 

DEFAULT_ANVIL_KEY := 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

all: clean remove update build

# Clean the repo
clean  :; forge clean

# Remove modules
remove :; rm -rf .gitmodules && rm -rf .git/modules/* && rm -rf lib && touch .gitmodules && git add . && git commit -m "modules"

# Update Dependencies
update:; forge update

build:; forge build

test :; forge test 

snapshot :; forge snapshot

format :; forge fmt

anvil :; anvil -m 'test test test test test test test test test test test junk' --steps-tracing --block-time 1

deploy: 
	@forge script script/DeployProofOfTestmonials.s.sol:DeployProofOfTestimonials --rpc-url http://localhost:8545 --private-key $(DEFAULT_ANVIL_KEY) --broadcast

deploy-gnosis-chiado:
	@forge script script/DeployProofOfTestmonials.s.sol:DeployProofOfTestimonials --rpc-url $(GNOSIS_CHIADO_RPC_URL) --legacy --private-key $(PRIVATE_KEY) --broadcast

deploy-neon-devnwt:
	@forge script script/DeployProofOfTestmonials.s.sol:DeployProofOfTestimonials --rpc-url $(NEON_DEVNET_RPC_URL) --legacy --private-key $(PRIVATE_KEY) --broadcast


