import { appDataPath, logFilePath } from "./Utils";

const fs = window.require("fs");

const reportString = `
<!-- 
NOTE: Please check the other issues to make sure the bug hasn't already been reported. Thanks! 
-->

**Describe the bug**
<!-- A clear and concise description of what the bug is -->

**Steps to Reproduce**
<!-- Steps to reproduce the behaviour. As much detail as possible -->
1.
2.
3.

**Expected behavior**
<!-- A clear and concise description of what you expected to happen -->

**Information**
<!-- Please include the output of your log files. Screenshots can be added too -->

<!-- Paste logs between the backticks -->
\`\`\`
${fs.readFileSync(logFilePath)}
\`\`\`

<!-- ***** -->
 - OS: ${navigator.platform}
 - OL Version: ${fs.readFileSync(appDataPath + "/Roaming/OpenLauncher/VERSION.txt")}
 - Selected launchers:

<!-- If possible: -->
  - Install location for launchers:

**Additional information**
<!-- Add any other context about the problem here. -->
`

const openReportFilled = () => {
  const encoded = encodeURIComponent(reportString);

  window.require("electron").shell.openExternal(`https://www.github.com/DexterHill0/OpenLauncher/issues/new?title=[Bug]%20<CHANGE%20ME!>&body=${encoded}&assignees=DexterHill0&labels=bug`)
}

export default openReportFilled;