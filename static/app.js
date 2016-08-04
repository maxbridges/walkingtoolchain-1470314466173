var exposeButton, layerA, layerContent, layerUI, nextButton, prevButton;

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
  html: "<strong>Microservices Toolchain</strong><br/><br/> <p>This is an explanation of this particular template. Isn't it grand?</p> <p>Have you ever seen a toolchain template? It's quite a marvellous thing.</p> <p>You can scan your stuff to make sure it's not awful, and also track your stuff after it's deployed so that you can see when it breaks.</p>",
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
    html: "<strong>Microservices Toolchain 2</strong><br/><br/> <p>Sigh. More text.</p> <p>What's that? Text, you say?</p> <p>Whoa! Text?!</p>"
  },
  third: {
    visible: true,
    html: "<strong>Microservices Toolchain 3</strong><br/><br/> <p>I've never seen a tool integration quite like this one!</p> <p>How neat is that!</p> <p>Can you hear it screaming?</p>"
  },
  fourth: {
    visible: true,
    html: "<strong>Microservices Toolchain 4</strong><br/><br/> <p>This is the greatest tool integration I've ever seen. </p> <p>Okay--just that last line, and then you're up, slugger!</p> <p>All dogs must be treasured.</p>"
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
  return exposeButton.visible = false;
});

prevButton.onTap(function() {
  layerContent.states.next("default");
  return exposeButton.visible = true;
});

nextButton.onTap(function() {
  return layerContent.states.next("second", "third", "fourth", "default");
});

layerContent.onStateDidSwitch(function() {
  if (layerContent.states.current === "fourth") {
    nextButton.html = "<strong>Close</strong>";
  }
  if (layerContent.states.current === "default") {
    exposeButton.visible = true;
    return nextButton.html = "<strong>Next</strong>";
  }
});
