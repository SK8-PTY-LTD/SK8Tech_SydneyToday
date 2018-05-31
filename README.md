# SK8Tech_SydneyToday
This repo contains the automation code to Automatically Top Post on SydneyToday.com

## Prerequisites

In order to use this automation code, the following software needs to be installed globally. 
1. [PhantomJS](http://phantomjs.org/)
1. [CasperJS](http://casperjs.org/)
1. [TagUI](https://github.com/kelaberetiv/TagUI)

> npm i -g phantom casperjs tagui

## Usage

### Recording an automation

1. Install a chrome extension: [TagUI Web Automation](https://chrome.google.com/webstore/detail/tagui-web-automation/egdllmehgfgjebhlkjmcnhiocfcidnjk) to record your automation. 
1. Open the page, and click the extension, then 'Start' to start recording
1. Once finished, click the extension again, click 'Export'. You should see a new tab opening
1. Copy the text on the page, then paste it into a new text file, let's name it 'automation.txt'

### Running an automation

If you have install the packages according to [Prerequisites](#prerequisites), you should be able to simply run the following command in terminal:

> tagui tagui_flow.js