# Research: Asynchronous oData calls
This application researches asynchronous oData calls in SAPUI5.
It's a simple dashboard with three panels which data is loaded independently.

Very important is the model setting "this.getModel("oDataService").setUseBatch(false);" in Component.js.
Without this setting the oData calls are combined to one $batch call.