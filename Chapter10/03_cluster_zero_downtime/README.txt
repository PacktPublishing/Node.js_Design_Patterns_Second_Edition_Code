This sample demonstrates how to restart a clustered Node.js app
without any interruption in the service (Zero-downtime restart)

To try the sample run:
  node clusteredApp
  
To trigger a restart use the command (works only on Linux/MacOS/*nix)
  kill -SIGUSR2 <MASTER_PROCESS_PID>
