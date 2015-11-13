sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("zv.research.async.controller.App", {
		onInit: function () {
			this.getView().setHeight("100%");
			
			var oModelOne = new sap.ui.model.json.JSONModel();
			var oModelTwo = new sap.ui.model.json.JSONModel();
			var oModelThree = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oModelOne, "oModelOne");
			this.getView().setModel(oModelTwo, "oModelTwo");
			this.getView().setModel(oModelThree, "oModelThree");
		},
		
		onPressRefresh: function() {
			this._loadData();
		},
		
		_loadData: function(){
			// IMPORTANT !!!
			// See Component.js -> init() for more information!
			
			// ODATA CALL ONE
			this.getView().byId("idPanelOne").setBusy(true);
			this.getOwnerComponent().getModel("oDataService").read("/DashboardDataSet", {
				"async": true,
				"urlParameters": {"$expand": "DashboardTimeboxSet"},
				"filters": [
					new sap.ui.model.Filter({
						path: "SprintStatus",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: "01"
					})
				],
				"success": function(oData) {
					this.getView().getModel("oModelOne").setData(oData.results[0].DashboardTimeboxSet);
					this.getView().byId("idPanelOne").setBusy(false);
				}.bind(this),
				"error": function(oError) {
					var oErrorBody = JSON.parse(oError.responseText);
					alert(oErrorBody.error.message.value);
				}
			});
			
			// ODATA CALL TWO
			// This call should take 2 seconds longer (WAIT UP TO 2 SECONDS in oData)
			this.getView().byId("idPanelTwo").setBusy(true);
			this.getOwnerComponent().getModel("oDataService").read("/DashboardDataSet", {
				"async": true,
				"urlParameters": {"$expand": "DashboardStorySet"},
				"filters": [
					new sap.ui.model.Filter({
						path: "SprintStatus",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: "01"
					})
				],
				"success": function(oData) {
					this.getView().getModel("oModelTwo").setData(oData.results[0].DashboardStorySet);
					this.getView().byId("idPanelTwo").setBusy(false);
				}.bind(this),
				"error": function(oError) {
					var oErrorBody = JSON.parse(oError.responseText);
					alert(oErrorBody.error.message.value);
				}
			});
			
			// ODATA CALL THREE
			this.getView().byId("idPanelThree").setBusy(true);
			this.getOwnerComponent().getModel("oDataService").read("/DashboardDataSet", {
				"async": true,
				"urlParameters": {"$expand": "DashboardActivitySet"},
				"filters": [
					new sap.ui.model.Filter({
						path: "SprintStatus",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: "01"
					})
				],
				"success": function(oData) {
					this.getView().getModel("oModelThree").setData(oData.results[0].DashboardActivitySet);
					this.getView().byId("idPanelThree").setBusy(false);
				}.bind(this),
				"error": function(oError) {
					var oErrorBody = JSON.parse(oError.responseText);
					alert(oErrorBody.error.message.value);
				}
			});
		}
	});

});