const React = require("react");

function Index(props) {
  const { veggies } = props;
  return (
    <div>
      <nav>
        <a href="/vegetables/new">Create new veggie</a>
      </nav>
      <h2>List of vegetables</h2>
      <ul>
        {veggies.map((ele,i) => {
          return (
            <li key={ele._id}>
              <a href={`/vegetables/${ele._id}`}>{ele.name}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
module.exports = Index;
