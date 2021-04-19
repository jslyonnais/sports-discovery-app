# To build and test locally, you will need to:
* Install Python 3.6.  
  [Download link](https://www.python.org/downloads/release/python-367/)  

* Install Azure Functions Core Tools version 2.2.70 or later (requires .NET Core 2.x SDK).  
  npm install -g azure-functions-core-tools  

* Install the Azure CLI  
  [Download link](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)  

# Run locally
* From the root, create a virtualenv if there isn't one and activate it  
  py -m venv env  
  .env\scripts\activate  

* Got to the func folder  

* Start the func  
  func host start  

# To publish and run in Azure:
* Install the Azure CLI version 2.x or later. (You need an active Azure subscription.)  

# Other links
[Create azure function](https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-function-python)  