# msflow-request
Request wrapper to simplify calling Microsft Flow [Logic App HTTP request](https://docs.microsoft.com/en-us/azure/connectors/connectors-native-reqres)  triggers from node

```js
const msFlowRequest = require("msflow-request")

const requestOptions = {
        triggerURL: "<url copied from Flow>",
        triggerType: "<get|post|put|patch|delete>",
        data: "<optional JSON data for post/put/patch operations>",
        proxy: "<optional proxy address>",
        timeout: <optional timeout in MS> }

const flowTrigger = new MSFlowRequest.FlowTrigger(requestOptions)

try{
    const flowResponse = await flowTrigger.trigger();
}
catch(flowError)
{
    console.log(flowError)
}
```

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).


Installation is performed via the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install msflow-request
```

## Features

  * Simple to use.
  * Easy access to data returned from Microsoft Flow HTTP Request triggers.
  * Easy access to the errors returned from Microsoft Flow HTTP request triggers.
  * Easy access to data returned from Microsoft Flow HTTP Response steps.
  * Simple configuration of proxy and timout values.

## Request options
  * triggerURL (mandatory): The URL provided by [Microsoft Flow](https://flow.microsoft.com) when a workflow with a HTTP Request trigger is saved.
  * triggerType (mandatory): The type of operation the HTTP Request trigger has been setup to accept (get|post|put|patch|delete).
  * data (optional): JSON data to be used for post/put/patch operations.
  * proxy (optional): The proxy service your node application will need to call to access the HTTP Request trigger.
  * timeout (optional): The maximum time in ms the request will wait for a response before timing out.

## Response fields
   * requestID: Unique ID for the request.
   * requestDateTime: Datetime the request was recieved by Flow.
   * statusCode: Status code returned by Flow (normally 200 or 202).
   * workflowRunID: Unique ID for this run of the workflow.
   * correlationID: Unique ID for the request.
   * clientTrackingID: Unique ID for this run of the workflow.
   * triggerHistoryName: Unique ID for this run of the workflow.
   * executionLocation: Datacenter location called by this request.
   * workflowID: Unique ID of the workflow.
   * workflowVersion: Encoded workflow version.
   * workflowName: Encoded workflow name.
   * workflowSystemID: Unique path to the workflow.
   * trackingID: Unique ID for the request.
   * remainingWorkflowWrites: Remaining burst writes (only returned when writing data).
   * remainingWorkflowReads: Remaining burst reads (only returned when reading data).
   * remainingWorkflowDLSize: Remaining burst download capacity (only returned when downloading).
   * remainingWorkflowULSize: Remaining burst upload capacity (only returned when uploading).
   * remainingAPIRequests: Remaining burst api requests.
   * data: JSON data returned by workflow response step (if one exists for the triggered workflow).
   * rawHead: Raw header information returned from the workflow.

## Error fields
   * requestID: Unique ID for the request, if the request made it to the workflow.
   * requestDateTime: Datetime the request was recieved by Flow, if the request made it to the workflow.
   * statusCode: Either a network error, or a status code returned by the workflow.
   * error: Error type.
   * message: Additional error message information.

## People

The author and maintainer of msflow-request is  [Nick Drew](https://github.com/NickDrew)