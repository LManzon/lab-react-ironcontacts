// import React from "react";
// import logo from "./logo.svg";
// import "./App.css";
// import contacts from "./contacts.json";

// const newContact = contacts.splice();

// function App() {
//   const [contactsArr, setContacts] = React.useState(contacts.splice(0, 5));

//   return (
//     <div className="App">
//       <h1> IRON CONTACTS</h1>
//       <table>
//         <thead>
//           <tr>
//             <th> Picture</th>
//             <th> Name</th>
//             <th> Popularity</th>
//           </tr>
//         </thead>
//       </table>
//       {contactsArr.map((list, index) => {
//         {
//           /* contactsArr.splice(5, 6); */
//         }
//         return <DisplayContacts key={index} {...list} />;
//       })}
//     </div>
//   );
// }

// function DisplayContacts(props) {
//   return (
//     <table>
//       {/* <thead>
//         <tr>
//           <th> Picture</th>
//           <th> Name</th>
//           <th> Popularity</th>
//         </tr>
//       </thead> */}

//       <tbody>
//         <tr>
//           <td>
//             {" "}
//             <img style={{ width: "7em" }} src={props.pictureUrl} />{" "}
//           </td>
//           <td>
//             <p>{props.name}</p>
//           </td>
//           <td>
//             <p>{props.popularity}</p>
//           </td>
//         </tr>
//       </tbody>

//       {/* <div>
//         <img style={{ width: "7em" }} src={props.pictureUrl} />
//       </div>

//       <p>Name: {props.name}</p>
//       <p>Popularity: {props.popularity}</p> */}
//     </table>
//   );
// }

import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import contacts from "./contacts.json";

function App() {
  const [contactsArr, setContactsArr] = React.useState(contacts.slice(0, 5));
  const [backgroundColor, setBackgroundColor] = React.useState("");

  function addRandomContact() {
    const randomIndex = Math.floor(Math.random() * contacts.length);

    setContactsArr([contacts[randomIndex], ...contactsArr]);
  }

  function sortByName() {
    const newArr = [...contactsArr].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setContactsArr(newArr);
  }

  const sortByPops = () => {
    const newArr = [...contactsArr].sort((a, b) => b.popularity - a.popularity);

    setContactsArr(newArr);
  };

  function deleteContact(index) {
    // should be by id, but in this case we are not checking for unique people in the list

    const newArr = [...contactsArr].filter((person, idx) => idx !== index);

    setContactsArr(newArr);
  }

  return (
    <div className="App" style={{ backgroundColor: backgroundColor }}>
      <h1>IronContacts</h1>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByName}>Sort by name</button>
      <button onClick={sortByPops}>Sort by pops</button>
      <BackgroundChanger setBackgroundColor={setBackgroundColor} />
      <table>
        <thead>
          <tr>
            <th>Pic</th>
            <th>Name</th>
            <th>Populatirty</th>
          </tr>
        </thead>
        <tbody>
          {contactsArr.map((person, index) => {
            // because you are inside the scope of the map, you have access to the `person` and `index` variables
            function deleteThisContact() {
              deleteContact(index);
            }
            {
              /* cmd + / */
            }
            //
            return (
              <Celeb
                {...person}
                index={index}
                key={`${person.id} - ${index}`}
                deleteContact={deleteContact}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Celeb(props) {
  return (
    <tr>
      <td>
        <img
          src={props.pictureUrl}
          alt={props.name}
          style={{ height: "150px" }}
        />
      </td>
      <td>{props.name}</td>
      <td>{props.popularity.toFixed(2)}</td>
      <td>
        {/* we need the deleteContact(props.index) */}
        <button onClick={() => props.deleteContact(props.index)}>Delete</button>
      </td>
    </tr>
  );
}

function BackgroundChanger(props) {
  // onChange = { handleInputChange };
  const [backgroundInput, setBackgroundInput] = React.useState("");

  function handleInputChange(event) {
    setBackgroundInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log("STOPPED");
    props.setBackgroundColor(backgroundInput);
    /* 
    onSubmit = i want you to do this code
    if (we never call event.preventDefault)
    handleSubmit()
    refreshed the page
    if (we call prevent default)
    handleSubmit
    can i refresh? Nope, because i was told not to
    */
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Which color do you want the background to be?</h1>
      <input
        type="text"
        placeholder="Write your color!"
        value={backgroundInput}
        // onChange={event => handleInputChange(event)}
        onChange={handleInputChange}
      />
      <button>AGAIN</button>
    </form>
  );
}

export default App;
