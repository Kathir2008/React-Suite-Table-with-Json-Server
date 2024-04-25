import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { Table, Button } from "rsuite";

function App() {
  const [users, setUsers] = useState([]);
  const { Column, HeaderCell, Cell } = Table;
  const data = users;
  const [showModal, setShowModal] = useState(false);
  
  const initial_State = {
    firstName: "",
    lastName: "",
    age: "",
    city: "",
    country: "",
    email: "",
    phone: "",
    gender: "",
    occupation: "",
    education: "",
    hobbies: "",
    notes: "",
    username: "",
  }


  const [formData, setFormData] = useState(initial_State);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/users");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData(initial_State)
    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to create user");
      }
      setShowModal(false);
      const newUser = await response.json();
      setUsers([...users, newUser]);
    } catch (error) {
      console.error("Error creating user:", error);
    }
    
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h1 className="text-center bg-dark text-white">R Suite Table</h1>
      <button
        className="btn btn-success mb-3 "
        onClick={() => setShowModal(true)}
      >
        Add User +
      </button>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Table
              height={400}
              data={data}
              onRowClick={(rowData) => {
                console.log(rowData);
              }}
            >
              <Column width={150} align="center" fixed>
                <HeaderCell>User Name</HeaderCell>
                <Cell dataKey="username" />
              </Column>
              <Column width={150}>
                <HeaderCell>First Name</HeaderCell>
                <Cell dataKey="firstName" />
              </Column>
              <Column width={150}>
                <HeaderCell>Last Name</HeaderCell>
                <Cell dataKey="lastName" />
              </Column>

              <Column width={100}>
                <HeaderCell>Gender</HeaderCell>
                <Cell dataKey="gender" />
              </Column>

              <Column width={100}>
                <HeaderCell>Age</HeaderCell>
                <Cell dataKey="age" />
              </Column>
              <Column width={100}>
                <HeaderCell>Country</HeaderCell>
                <Cell dataKey="country" />
              </Column>

              <Column width={150}>
                <HeaderCell>Phone</HeaderCell>
                <Cell dataKey="phone" />
              </Column>

              <Column width={150}>
                <HeaderCell>Email</HeaderCell>
                <Cell dataKey="email" />
              </Column>
              <Column width={150}>
                <HeaderCell>Occupation</HeaderCell>
                <Cell dataKey="occupation" />
              </Column>
              <Column width={150}>
                <HeaderCell>Education</HeaderCell>
                <Cell dataKey="education" />
              </Column>
              <Column width={80} fixed="right">
                <HeaderCell>Action</HeaderCell>

                <Cell style={{ padding: "6px" }}>
                  {(rowData) => (
                    <Button
                      appearance="link"
                      color="red"
                      onClick={() => handleDelete(rowData.id)}
                    >
                      Delete
                    </Button>
                  )}
                </Cell>
              </Column>
            </Table>
            {showModal && (
              <div
                className="modal"
                tabIndex="-1"
                role="dialog"
                style={{ display: "block" }}
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Create User</h5>
                      <button
                        type="button "
                        className="btn close"
                        onClick={() => setShowModal(false)}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="modal-body">
                        {/* Form fields */}
                        <div className="form-group">
                          <label htmlFor="firstName">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="lastName">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="username">User Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="age">Age</label>
                          <input
                            type="text"
                            className="form-control"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="city">City</label>
                          <input
                            type="text"
                            className="form-control"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="country">Country</label>
                          <input
                            type="text"
                            className="form-control"
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input
                            type="text"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="phone">Phone</label>
                          <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="gender">Gender</label>
                          <input
                            type="text"
                            className="form-control"
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="occupation">Occupation</label>
                          <input
                            type="text"
                            className="form-control"
                            id="occupation"
                            name="occupation"
                            value={formData.occupation}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="education">Education</label>
                          <input
                            type="text"
                            className="form-control"
                            id="education"
                            name="education"
                            value={formData.education}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="hobbies">Hobbies</label>
                          <input
                            type="text"
                            className="form-control"
                            id="hobbies"
                            name="hobbies"
                            value={formData.hobbies}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="notes">Notes</label>
                          <input
                            type="text"
                            className="form-control"
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary float-start"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                        >
                          Add
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
