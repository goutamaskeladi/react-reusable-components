import useFetch from "../hooks/useFetch";

const UserList = () => {
  const { isLoading, data, error, setData } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );
  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const handleDeleteUser = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const onSelectionChange = (e) => {
    const sortDirection = e.target.value;
    const copyUsers = [...data];
    copyUsers.sort((a, b) => {
      return sortDirection === "0" ? a.id - b.id : b.id - a.id;
    });
    setData(copyUsers);
  };
  return (
    data?.length > 0 && (
      <div className="user-list">
        <select defaultValue={0} onChange={onSelectionChange}>
          <option value={0}>Ascending</option>
          <option value={1}>Descending</option>
        </select>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td onClick={() => handleDeleteUser(item.id)}>&#10006;</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
  );
};

export default UserList;
