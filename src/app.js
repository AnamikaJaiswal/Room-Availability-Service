const express = require('express');
const app = express();
const port =3000;

let data =[
    {id:1, Restraunt:['taj','RUDE','kfc'], city: 'vashi', TableID:[1,2,3,4]},
    {id:2, Restraunt:['Spicefactory','trends','chillout'], city: 'powai', TableID:[1,2,3,4]},
    {id:3, Restraunt:['PALMTREE','trace', 'sevenhighs'], city: 'kharghar', TableID:[1,2,3,4]},
    {id:4, Restraunt:['malwan','tadka'], city: 'goregaon', TableID:[1,2,3]}

]

let table =[
    {id:1, Type:'Basic', price: 100, isAvailable: true},
    {id:2, Type:'regular', price: 200, isAvailable: true},
    {id:3, Type:'medium', price: 300, isAvailable: true},
    {id:4, Type:'large', price: 400, isAvailable: true},
]

// To get a list of restaurants based on city selection
app.get('/restaurants/:city', (req, res) => {
    const { city } = req.params;
    const restaurantsInCity = data.filter(response => response.city === city);
    if (restaurantsInCity.length > 0) {
        const restaurantNames = restaurantsInCity[0].Restraunt;
        res.json(restaurantNames);
    } else {
        res.status(404).json({ error: 'No restaurants found in the specified city' });
    }
  });

  //return type of table available on selection of restaurant

  app.get('/tabletype/:restaurant', (req,res) =>{
      const { restaurant} =req.params;
      const selectedRestraunt = data.find(response => response.Restraunt.includes(restaurant));
      console.log("which :", restaurant)
      if(selectedRestraunt){
          const TableIDs = selectedRestraunt.TableID;
        const availabletable = table.filter(response => TableIDs.includes(response.id)&& response.isAvailable);
        const Tabletype =availabletable.map(response => response.Type);
        if (Tabletype.length > 0) {
            res.json(Tabletype);
        } else {
            res.status(404).json({ error: 'No available tables for the specified restaurant' });
        }
    }else {
            res.status(404).json({ error: 'Restaurant not found' });
        }
  });

  //Get availability of table and price .
app.get('/table/price', (req,res) =>{
    const avaialabletable = table.filter(response => response.isAvailable ===true)
    const tableAvailability = avaialabletable.map((response) => {
        return { Type: response.Type, price: response.price };
      });
      res.json(tableAvailability);
})

app.post('/book/:restaurantId/:tableType', (req, res) => {
    const { restaurantId, tableType } = req.params;
    const restaurant = restaurants.find(restaurant => restaurant.id === parseInt(restaurantId));
  
    if (restaurant && restaurant.tables.includes(tableType)) {
      // Update availability
      const index = restaurant.tables.indexOf(tableType);
      restaurant.tables.splice(index, 1);
     //sending booking confirmation
      res.json({ message: 'Booking confirmed', tableType, price: restaurant.price });
    } else {
      res.status(404).json({ error: 'Table not available for booking' });
    }
  });


  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
