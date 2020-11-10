import React, { useEffect, useState } from 'react'
import {WImage,WCanvas,WTitle,WSidemenu,WLayout,WTableColImage,WButton,WTextField,WSelectField,WSelectFieldOption,WForm,WTable,WTableCol,WRatingField,WCheckRadio } from 'wocom'
import 'wocom/dist/index.css'

const App = () => {
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [pageSize, setPageSize] = useState(2);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState<string>("");
  const [loadError,setLoadError] = useState<string>();
  const [canvasLayer,setCanvasLayer] = useState<string>("f2");

  async function loadData(p?:number){

    setLoadingItems(true);
    try {
      let response = await fetch(`http://192.168.0.2:3000/api/products/?pageSize=${pageSize}&page=${p || page}&sort=${sort}`);
      let data = await response.json();

      setItems(data.rows);
      setPageSize(data.pageSize);
      setTotalPages(data.totalPages);
      setPage(data.page);
    }
    catch (e) {
      setLoadError("Error al cargar los datos");
    }


    setLoadingItems(false);
  }


  function ProductNameCol(value:any)
  {
    return (<strong>{value}</strong>)
  }

  const [name, setName] = useState("")


  useEffect(()=>{
    loadData(1);

    setTimeout(()=>{
      setName('ABC123')
    },2000)
  },[])

  useEffect(()=>{
    loadData();
  },[sort])

  return (
    <WLayout softwareVersion={"v1.0.0"} title={"Company Name"} logo={"https://livejones.com/wp-content/uploads/2020/05/logo-Placeholder.png"} leftSidebar={<WSidemenu items={[{label:'Users',href:'https://google.com.ar'},{label:'Products',href:'https://google.com.ar'}]} />} >
      {/*style={{maxWidth:"900px",margin:"auto",width:"90%"}}*/}

          <WTitle>Demo title</WTitle>
          <WForm>
            {/*style={{width:"100%",display:"grid",gridTemplateColumns:"1r",gridGap:"1.5rem"}}*/}

            <WTextField debounce={1500} onChange={(val)=>console.log("VAL",val)} value={name} rules={{max:120}} label="Nombre"></WTextField>
            <WTextField rules={{max:120}} label="Apellido"></WTextField>
            <WTextField rules={{min:20,max:100,positive:true,integer:true}}  validationType="number" maskOptions={{mask:[/\d/,/\d/],guide:false}}  label="Edad"></WTextField>
            <WTextField rules={{optional:true,min:10,max:500}} label="Descripción" textarea></WTextField>
            <WSelectField rules={{type:'number'}} label="Lenguajes de programación">
              <WSelectFieldOption value={1} label="Javascript" />
              <WSelectFieldOption value={2} label="Python" />
              <WSelectFieldOption value={3} label="C#" />
            </WSelectField>
            <WRatingField rules={{min:1,max:5}}    label="Calificación"  />
            <WCheckRadio type={'checkbox'} label="Zanahoria" />

            <button onClick={()=>{setCanvasLayer('f3')}}>F3</button>
            <button onClick={()=>{setCanvasLayer('f2')}}>F2</button>

            <WCanvas polygons={{"f3":[ [[0,0.1],[0.1,0.1],[0.2,0.2],[0.1,0.2]]  ]}}  label={"Regions of interest"}  layers={[{type:'polygon',name:'f3'},{maxItems:1,type:'polygon',name:'f2',style:{stroke:'none',fill:'rgba(255,120,32,0.5)'}}]} currentLayer={canvasLayer} >
              <WImage src={"https://constructionreviewonline.com/wp-content/uploads/2019/12/2019-12-17_5df95c47afa15_Roads.jpg"}/>
            </WCanvas>
            <WButton type="submit" label="Aceptar"></WButton>
          </WForm>
          <br/><br/>

          {/*<WPagination page={19} padding={2} totalPages={20} /> */}
          {/* Agregar type para distinguir local y server pagination */}
          <WTable error={loadError} onSort={(sort:string)=>{setSort(sort);loadData();}} paginationConfig={{onPage:loadData,totalPages:totalPages,pageSize:pageSize,page:page,type:'server'}} title="Posts" breakpoint={"767px"} maxHeight="600px" items={items} loading={loadingItems}>
            <WTableColImage width="25%" header={"Image"} prop={"image"}  key={1}/>
            <WTableCol width="25%" sortable key={2} header="Name" body={ProductNameCol} prop="name"></WTableCol>
            <WTableCol width="25%" sortable  key={3} header="Price" prop="price"></WTableCol>
            <WTableCol width="25%" sortable  key={4} header="Quantity" prop="quantity"></WTableCol>
          </WTable>
          <br />
          <br/><br/>
    </WLayout>
  )
}

export default App
