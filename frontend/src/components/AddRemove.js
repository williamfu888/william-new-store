import { useEffect, useReducer, useState } from 'react';

function AddRemove() {
  const [getList, setList] = useState([{service:''}]);
  const inputChangeHandler = (event, index) => {
      console.log('index',index);
      let list = [...getList];
      list[index].service = event.target.value;
      console.log(getList[index].service);
      setList(list);
  };
  const removeHandler = (index)=> {
    let list = [...getList];
    list.splice(index,1);
    setList(list);
  }
  const addHandler =() => {
    let list = [...getList,{service:''}];
    setList(list);
  }
  return (
    <div>
        {getList.map((item, index)=> (
            <div key={index}>
            <input  
            type="text"
            placeholder="will"
            value={item.service}
            onChange={event=>inputChangeHandler(event, index)}
            ></input>
            <button onClick ={()=>removeHandler(index)}>Remove</button>
            </div>
        ))} 
        <button onClick={addHandler}>Add </button>
    </div>
  );
}
export default AddRemove;
