function _1(md){return(
md`# HW2 Simple baseline (4pt)`
)}

function _personalid(FileAttachment){return(
FileAttachment("PersonalID.json").json()
)}

function _3(Plot,personalid){return(
Plot.plot({
  y:{grid :true,label:"count"},
  marks: [
    Plot.rectY(personalid, Plot.binX({y: "count"}, {x: "Year",interval:1,fill: "black"})),
    Plot.gridY({interval:1,stroke:"White",strokeOpacity:0.5})
  ]
})
)}

function _plot1(Inputs){return(
Inputs.form({
	mt:  Inputs.range([0, 100], {label: "marginTop", step: 1}),
	mr:  Inputs.range([0, 100], {label: "marginRight", step: 1}),
	mb:  Inputs.range([0, 100], {label: "marginBottom", step: 1}),
	ml:  Inputs.range([0, 100], {label: "marginLeft", step: 1}),
})
)}

function _5(Plot,plot1,personalid){return(
Plot.plot({
  marginTop: plot1.mt, 
	marginRight: plot1.mr, 
	marginBottom: plot1.mb, 
	marginLeft: plot1.ml,   

  y:{grid :true,label:"count"},
  marks: [
    Plot.rectY(personalid, Plot.binX({y: "count" }, {x: "Year",interval:1,fill: "Gender",tip:true})),
    Plot.gridY({interval:1,stroke:"White",strokeOpacity:0.5}),

  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["PersonalID.json", {url: new URL("../PersonalID.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("personalid")).define("personalid", ["FileAttachment"], _personalid);
  main.variable(observer()).define(["Plot","personalid"], _3);
  main.variable(observer("viewof plot1")).define("viewof plot1", ["Inputs"], _plot1);
  main.variable(observer("plot1")).define("plot1", ["Generators", "viewof plot1"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","plot1","personalid"], _5);
  return main;
}
