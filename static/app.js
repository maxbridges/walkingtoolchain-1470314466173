var exposeButton, highlighter, layerA, layerContent, layerUI, nextButton, prevButton;

layerA = new BackgroundLayer({
  backgroundColor: "rgba(130,130,130,1)"
});

layerUI = new Layer({
  image: "images/create_toolchain_from_template.png",
  x: 0,
  y: 0,
  height: 900,
  width: 1600
});

layerUI.states.add({
  second: {
    image: "images/create_microservices_expanded.png",
    x: 0,
    y: 0,
    height: 900,
    width: 1600
  }
});

highlighter = new Layer({
  visible: false
});

highlighter.states.add({
  think: {
    visible: true,
    x: 615,
    y: 250,
    height: 450,
    width: 94,
    backgroundColor: "yellow",
    opacity: .2
  },
  code: {
    x: 615 + 94.
  },
  deliver: {
    x: 610 + (94 * 2),
    width: 170
  },
  run: {
    x: 592 + (94 * 4),
    width: 90
  },
  manage: {
    x: 588 + (94 * 5)
  },
  culture: {
    x: 583 + (94 * 6)
  }
});

highlighter.animate;

exposeButton = new Layer({
  visible: false,
  y: 620,
  x: 100,
  width: 180,
  height: 36,
  html: "<span style='margin: 0 auto'>Tool integration details</span",
  style: {
    "font-size": "14px",
    "color": "rgba(230,230,230,1)",
    "text-align": "center"
  },
  z: 1000,
  borderWidth: 2,
  borderColor: "rgba(130,130,130,1)",
  backgroundColor: "#0F212E"
});

layerContent = new Layer({
  visible: false,
  backgroundColor: "#0F212E",
  html: "<h2>Microservices Toolchain</h2><br/><h3>Think:</h3> <em>Incrementally deliver awesome solutions</em> <p><strong>Issues</strong> is a tracking tool that is integrated with your GitHub repository. Use Issues to focus on important tasks and keep plans up to date simultaneously.</p>",
  x: 99,
  y: 280,
  height: 360,
  width: 480,
  style: {
    "font-size": "14px"
  }
});

layerContent.states.add({
  second: {
    visible: true,
    html: "<h2>Microservices Toolchain</h2><br/><h3>Code:</h3> <em>Create innovative solutions fast</em> <p><strong>GitHub</strong> makes it easy to manage source code and revision history, and to track bugs, feature requests and tasks in hosted Git repositories.</p><br/> <p>Use the <strong>Orion Web IDE</strong> in IBM® Bluemix® DevOps Services to create, edit, run, debug, perform source control tasks and deploy your code.</p>"
  },
  third: {
    visible: true,
    html: "<h2>Microservices Toolchain</h2><br/><h3>Deliver:</h3> <em>Accelerate time to market and reduce costs</em> <p><strong>The Delivery Pipeline</strong> provides automated, continuous delivery to the IBM® Bluemix® cloud.</p><br/> <p>Run continuous integration tests securely and efficiently in the cloud without the hassles of managing infrastructure using <strong>Sauce Labs</strong>.</p>"
  },
  fourth: {
    visible: true,
    html: "<h2>Microservices Toolchain</h2><br/><h3>Run:</h3> <em>Services, options, and capabilities to run solutions</em> <p><strong>IBM® Bluemix®</strong> is an open-standards cloud platform that provides flexible computing options, various DevOps tools, and a powerful set of IBM and third-party APIs and services so that you can focus on building excellent user experiences.</p>"
  },
  fifth: {
    visible: true,
    html: "<h2>Microservices Toolchain</h2><br/><h3>Manage:</h3> <em>Ensure operational excellence</em> <p>Use <strong>PagerDuty</strong> to reduce downtime by notifying your operations team of critical incidents as soon as they happen.</p>"
  },
  sixth: {
    visible: true,
    html: "<h2>Microservices Toolchain</h2><br/><h3>Culture:</h3> <em>Transform & innovate with speed</em> <p><strong>Slack</strong> improves team collaboration by integrating real-time messaging with a multitude of cloud storage, development, testing, operations, analytics, and productivity services.</p>"
  }
});

layerContent.states.animationOptions = {
  time: 0
};

nextButton = new Layer({
  parent: layerContent,
  height: 35,
  width: 120,
  backgroundColor: "#0F212E",
  html: "<strong>Next</strong>",
  x: Align.right,
  y: Align.bottom,
  borderWidth: 2,
  borderColor: "rgba(130,130,130,1)",
  style: {
    "text-align": "center"
  }
}, {
  "vertical-align": "bottom",
  "font-size": "18px",
  "line-height": "40px"
});

prevButton = new Layer({
  parent: layerContent,
  height: 35,
  width: 120,
  html: "<strong>Go Back</strong>",
  backgroundColor: "#0F212E",
  x: 0,
  y: Align.bottom,
  borderWidth: 2,
  borderColor: "rgba(130,130,130,1)",
  style: {
    "text-align": "center"
  }
}, {
  "vertical-align": "bottom",
  "font-size": "18px",
  "line-height": "40px"
});

layerUI.onTap(function() {
  if (layerUI.states.current === "default") {
    return layerUI.states.next();
  }
});

layerUI.onStateDidSwitch(function() {
  if (layerUI.states.current !== "default") {
    exposeButton.visible = true;
    if (layerContent.visible === false) {
      return layerContent.visible === true;
    } else if (layerUI.states.current === "default") {
      return exposeButton.visible = false;
    }
  }
});

exposeButton.onTap(function() {
  layerContent.visible = true;
  exposeButton.visible = false;
  return highlighter.states["switch"]("think");
});

prevButton.onTap(function() {
  layerContent.states.next("default");
  return exposeButton.visible = true;
});

nextButton.onTap(function() {
  layerContent.states.next("second", "third", "fourth", "fifth", "sixth", "default");
  return highlighter.states.next();
});

layerContent.onStateDidSwitch(function() {
  if (layerContent.states.current === "sixth") {
    nextButton.html = "<strong>Close</strong>";
  }
  if (layerContent.states.current === "default") {
    exposeButton.visible = true;
    nextButton.html = "<strong>Next</strong>";
    return highlighter.states.next("default");
  }
});
