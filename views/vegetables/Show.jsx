const React=require("react");

function Show(props){
const {veggie}=props;
console.log(veggie);
return(
    <div>
        <p>{veggie.name} is {veggie.color} and is {veggie.fresh}</p>
    </div>
)

}
module.exports=Show;