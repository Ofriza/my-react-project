import react from 'react'
import ReactDOM from 'react-dom'
import React, {useState,useBooksData} from 'react'
import axios from 'axios'
import MyWishList from './MyWishList'
import { confirmable } from 'react-confirm';
import { confirmAlert } from "react-confirm-alert";
import './App.css';


const App =()=>{
    
    const [book,setBook]= useState("");
    const [result,setResult]= useState([]);
    const [pic,setPic]= useState(false);
    const [apiKey,setApiKey]=useState("AIzaSyB2wJgrh53LdsIy9ZpecFhSxPhQQT8JTD0");

    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
      };
    const handleChange =(event)=>{
        const book=event.target.value.replace(/ /g, '');
        setBook(book);
    }

    const handleClickPic =(event)=>{
        
        const pic=event.target.value;
        setPic(pic);
        console.log("clicked")
        if (window.confirm("More Book Details:")
        ) {
            
            
          /* result.map((val)=>
           {book.volumeInfo.imageLinks.thumbnail} 
          )
        console.log(book.volumeInfo.title)
        */} 
        
    }
    const handleSubmit =(event)=>{


        if(book.length<3){
            alert("Book name has to contain at least 3 letters")
        }
        else if (!/^[a-zA-Z]+$/.test(book)){
            alert("Book name has to be only in English letters")

        }
        else{
            try{
        event.preventDefault();
        console.log(book);
        axios.get("https://www.googleapis.com/books/v1/volumes?q="+book+"&key="+apiKey+"&maxResults=10")
        .then(data =>{
            console.log(data.data.items);
            setResult(data.data.items);
        })}
        catch(err){
            if(err instanceof Error){
                console.log(err.name)
            }
            else{
                console.log("Book not found")
            }
        }
    
    }
    }
    return ( 
    
        <div class="container"><br></br>
            <h1 class="H1">Book Search App</h1>
            <h2 class="H2">Welcome! Please enter your desired book</h2>
            <nav id="nav" class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="nav-link" href="#">Home <span class="sr-only"></span></a>
  <ul></ul>
  <a class="nav-link" href="#" onClick={() => openInNewTab(<MyWishList />)}>WishList</a>
 
  
  <form onSubmit={handleSubmit}>
            <div class="input-group">
                <input  onChange={handleChange} type="text" className="form-control mt-10" placeholder='Search for books' autoComplete='off'>
                </input>
                <button type="submit" className="btn btn-outline-primary">Search</button>
                <br></br>
            </div>
            
        </form>
        
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
   
  </div>
 
</nav>
<br></br>
<center>

{result.map(book => (
    <a target="_blank" href={book.volumeInfo.previewLink}>
            <img class='padded' onClick={handleClickPic} src={book.volumeInfo.imageLinks.thumbnail} alt={book.title}  />
            
            </a>
        ))}
       
<br></br>
</center>
        </div>
    )
  }

  export default App
