if (window.__react_runtime_loaded__) {
  console.log("Bypassing injection of React framework runtime in portlet id=com.xtivia.speedray.swagger-ui");
} else {
  window.__react_runtime_loaded__ = true;
  console.log("Injecting React framework runtime in portlet id=com.xtivia.speedray.swagger-ui");
  document.write("<script defer id='reactruntimeloader' src='/o/com.xtivia.speedray.swagger-ui/react_runtime.dll.js'></script>");
}
document.write("<script defer src='/o/com.xtivia.speedray.swagger-ui/lib/app.js'></script>");
  