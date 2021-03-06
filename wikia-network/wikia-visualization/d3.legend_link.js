// d3.legend.js 
// (C) 2012 ziggy.jonsson.nyc@gmail.com
// MIT licence
// Modified

(function() {
d3.legend_link = function(g) {
  g.each(function() {
    var g= d3.select(this),
        items = {},
        svg = d3.select(g.property("nearestViewportElement")),
        legendPadding = g.attr("data-style-padding") || 5,
        lb = g.selectAll(".legend-box").data([true]),
        li = g.selectAll(".legend-items").data([true])

    lb.enter().append("rect").classed("legend-box",true)
    lb.enter().append("text")
        .text("Relationship\n")
        .style("fill", "white");

    li.enter().append("g").classed("legend-items",true)

    svg.selectAll("[data-legend-2]").each(function() {
        var self = d3.select(this)
        items[self.attr("data-legend-2")] = {
          pos : self.attr("data-legend-pos") || this.getBBox().y,
          color : self.attr("data-legend-color") != undefined ? self.attr("data-legend-2-color") : self.style("stroke") != 'none' ? self.style("stroke") : self.style("stroke") 
          // color : self.attr("data-legend-color") != undefined ? 
          //   self.attr("data-legend-color") : 
          //   self.style("fill") != 'none' ? self.style("fill") : self.style("stroke"),
          // icon: self.attr("data-legend-icon") || "circle"
        }
      })

    items = d3.entries(items).sort(function(a,b) { return a.value.pos-b.value.pos})

    li.selectAll("text")
        .data(items,function(d) { return d.key})
        .call(function(d) { d.enter().append("text")})
        .call(function(d) { d.exit().remove()})
        .attr("y",function(d,i) { return i+1 + "em"})
        .attr("x","1em")
        .text(function(d) { ;return d.key})
        .style("fill", "white");
    
    li.selectAll("line")
        .data(items,function(d) { return d.key})
        .call(function(d) { d.enter().append("line")})
        .call(function(d) { d.exit().remove()})
        .attr("x1", "-0.4em")
        .attr("x2", "0.4em")
        .attr("y1", function(d,i) { return (i+0.75)+"em"})
        .attr("y2", function(d,i) { return (i+0.75)+"em"})
        .style("stroke-width", 2)
        .style("stroke", function(d) { return d.value.color})
    
    // Reposition and resize the box
    var lbbox = li[0][0].getBBox()  
    lb.attr("x",(lbbox.x-legendPadding))
        .attr("y",(lbbox.y-2*legendPadding))
        .attr("height",(lbbox.height+4*legendPadding))
        .attr("width",(lbbox.width+4*legendPadding))
  })
  return g
}
})()