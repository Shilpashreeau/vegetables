const React=require("react");

function New(){

return(
<div><h2>Please fill the form to add new veggie</h2>
<form action="/vegetables" method='POST'>

            Name:<input type="text" name="name"/>
            <br/>
            Color:<input type="text" name="color"/>
            <br/>
            Fresh:<input type="checkbox" name="fresh"/>
            <br/>
            <input type="submit" value="Create new veggie"/>
            
        </form>




</div>

)

}
module.exports=New;
