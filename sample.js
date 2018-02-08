// taken from my other repo px-test

function readPX(data){
//   const PX = new Px(data);
//   const px = {}
//   px.metadata = PX.metadata
//   px.keywords = PX.keywords();
//   px.variables = PX.variables();
//   px.variable = index=>PX.variable(index);
//   px.values = variable=>PX.values(variable);
//   px.codes = variable=>PX.codes(variable);

//   px.data = {}
//   for(let vr of px.variables){
//     let data = _.zip( px.values(vr), px.codes(vr) )
//     px.data[vr.replace(" ", "")] = data.map((arr, index)=>{  return {name:arr[0], code:arr[1], index:index}   })
//   }

  px.getData = (arr=new Array(px.variable.length).fill(0))=>PX.datum(arr);
  px.column = arr=>PX.dataCol(arr);
  px.valCounts = ()=>PX.valCounts();


  px.column2 = (col=0, opt={})=>{
    let colIndex
    if(typeof col == 'string'){
      colIndex = px.variable(col)
    }else if(typeof col == 'number'){
      colIndex = col
      col = px.variable(col)
    }else{
      return []
    }

    let arr = new Array(px.variables.length).fill(0)
    arr[colIndex] = '*'
    _.each(opt, (value, key)=>{
      if(typeof value == 'string'){
        value = _.find(px.data[key.replace(" ", "")], obj=>obj.name.toLowerCase()==value.toLowerCase()).index
      }
      arr[px.variable(key)] = value
    })
      
    data =  _.zip(PX.dataCol(arr), px.values(col) );
    return data.map((arr, index)=>{  return {value:arr[0], [col.replace(" ", "")]:arr[1]}   })
  }

  px.dictionary = arr=>PX.dataDict(arr);

  //px.entries = PX.entries();
  // CALLED LIKE
  // <p><%= entries() %> </p>

  return px
}
