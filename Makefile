initial:
	@echo "Installing dependencies..."
	@pnpm install
	@echo "Installing dependencies... Done"
	@echo "Creating .env file..."
	@cp .env.example .env
	@echo "Creating .env file... Done"
	@echo "Creating expo .env file..."
	@cp apps/expo/.env.example apps/expo/.env
