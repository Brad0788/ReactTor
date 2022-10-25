import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import ProgressBar from '@ramonak/react-progress-bar';
import { LinearProgress } from '@mui/material/';
import { ThemeProvider, createTheme, rgbToHex } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';
import TemporaryDrawer from './Drawer';
import BasicCard from './Card';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

function MyButton({count, onClick}) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar( {filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange}) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText}
        placeholder="Search..." 
        onChange={(e) => onFilterTextChange(e.target.value)}/><br/>
      <label>
        <input 
          type="checkbox"
          checked={inStockOnly} 
          onChange={(e) => onInStockOnlyChange(e.target.checked)}/>
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}
function TorrentCard(){

};

function FilterableProductTable({ products }) {

  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText}
        inStockOnly={inStockOnly} 
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}/>
      <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
    </div>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/qbit")
      .then((res) => res.json())
      .then((data) => setData(data.torrents));
    console.log(data);
  }, []);
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
      <BasicCard/>
      <div style={{textAlign:"center",backgroundColor:"#424242"}}>
      <TemporaryDrawer/>
      
        <h1 style={{color: 'white'}}>Torrents</h1>
          {
            !data ? "Loading..." : data.map(torrent =>(
              <>
              <Stack direction="row" spacing={2}>
              <Box sx={{ml:"5%", mb:"1%", width: "60%"}}>
              <Accordion sx={{borderRadius: 1}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{bgcolor: '#303030',borderRadius: 1}}
                >
                  <Typography>{torrent.name}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{borderRadius: 1}}>
                  <Typography sx={{mt: "1%"}}>
                    Size: {((torrent.size)/1000000).toFixed(2)} MB
                  </Typography><br />
                  <Box sx={{ml: "10%", mr: "10%"}}>
                    <LinearProgress variant='determinate' value={((torrent.progress)*100).toFixed(1)}/>
                    <span><strong>{((torrent.progress)*100).toFixed(1)}</strong></span>
                  </Box><br />
                </AccordionDetails>
              </Accordion>
              </Box>
              <Box>
                <Button variant="contained">Delete</Button>
              </Box>
              </Stack>
              
              {/*<div class="d-flex justify-content-center"><Alert variant='info'><span><strong>Name: </strong>{torrent.name}</span></Alert></div>
              <div class="d-flex justify-content-center"><Alert variant='success'><span><strong>Completed: </strong>{torrent.completed}</span></Alert></div>*/}
              </>
            ))
           //<span><strong>Name:</strong>{data.completed}</span>
          }
      </div>
      </ThemeProvider>
    </div>
  );
};



