# Data Directory

This directory contains application data files. Here's what you need to know:

## Files

- `endorsements.json`: Stores all endorsement data (automatically created, do not commit to version control)
- `endorsements.sample.json`: Sample data file with default values (safe to commit)

## Setup

1. Copy the sample file to create the initial data file:
   ```bash
   cp data/endorsements.sample.json data/endorsements.json
   ```

2. Ensure the `data` directory has write permissions:
   ```bash
   chmod 755 data
   chmod 644 data/endorsements.json
   ```

## Development

- The application will create `endorsements.json` automatically if it doesn't exist
- Never commit `endorsements.json` to version control
- The sample file (`endorsements.sample.json`) should contain default/initial data

## Production

- Back up the `endorsements.json` file regularly
- Consider using a proper database for production use
- Ensure the web server has write permissions to this directory
