import React, { useEffect, useState } from 'react'

//
import {renderToast,WTableColImage,WList,WMenu,WTableColActions,WPopup,WImage,WCanvas,WTitle,WSidemenu,WLayout,WButton,WTextField,WSelectField,WSelectFieldOption,WForm,WTable,WTableCol,WRatingField,WCheckRadio, DefaultTheme } from 'wocom'
import {ThemeProvider} from 'styled-components';
import 'wocom/dist/index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit,faTrash,faCheck } from '@fortawesome/free-solid-svg-icons'

const App = () => {
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [pageSize, setPageSize] = useState(2);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState<string>("");
  const [loadError,setLoadError] = useState<string>();
  const [canvasLayer,setCanvasLayer] = useState<string>("f2");
  const [popupOpened, setPopupOpened] = useState<boolean>(false);
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  let toastCounter = 0;
  function showToast()
  {
    toastCounter++;
    renderToast({title:'('+toastCounter+') Lorem ipsum sit amet',description:'foo bar baz asda sasd asdsda',timeout:10000,mode:'info'})
  }

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

  function onSubmit() {
    alert('submit')
  }

  function ProductNameCol(value:any)
  {
    return (<strong style={{fontWeight:600}}>{value}</strong>)
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
    <ThemeProvider theme={DefaultTheme}>
      <WLayout softwareVersion={"v1.0.0"} title={"Company Name"} logo={"https://livejones.com/wp-content/uploads/2020/05/logo-Placeholder.png"}
               leftSidebar={<WSidemenu items={[
                 {label:'Users',href:'https://google.com.ar'},
                 {label:'Products',href:'https://google.com.ar',items:[
                   {label:'List products',href:'http://wikipedia.org'},
                   {label:'Add product',href:'http://npmjs.com'}
                 ]}
                 ]} />} >
        {/*style={{maxWidth:"900px",margin:"auto",width:"90%"}}*/}

            <WTitle>Demo title</WTitle>
            <WForm onSubmit={onSubmit}>
              <WTextField rules={{}} onChange={()=>console.log("CHANGE")} label="Apellido"></WTextField>
              <WButton type="submit" label="Aceptar"></WButton>
            </WForm>
            <br/>
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
            <WTable selectionMode={'multiple'} error={loadError} onSort={(sort:string)=>{setSort(sort);loadData();}} paginationConfig={{onPage:loadData,totalPages:totalPages,pageSize:pageSize,page:page,type:'server'}} title="Posts" breakpoint={"767px"} items={items} loading={loadingItems}>
              {/* <WTableCol width="10%" header={""} prop={"check"} body={()=><WCheckRadio type={"radio"} />} /> */}
              <WTableColImage width="22%" header={"Image"} prop={"image"}  key={1}/>
              <WTableCol width="22%" sortable key={2} header="Name" body={(props)=>ProductNameCol(props?.value)} prop="name"></WTableCol>
              <WTableCol width="22%" sortable  key={3} body={(params)=><>${params?.value}</>} header="Price" prop="price"></WTableCol>
              <WTableCol width="22%" sortable  key={4}  header="Quantity" prop="quantity"></WTableCol>
              <WTableCol width="12%"
                         key={5}
                         header={""}
                         prop={"actions"}
                         body={(params)=>
                           <WTableColActions
                           actions={[
                             {  label:'Edit',icon:<FontAwesomeIcon icon={faUserEdit} />, onClick:()=>{console.log(params)} },
                             {  label:'Delete',icon:<FontAwesomeIcon icon={faTrash} />,onClick:()=>{} },
                             {  label:'Mark',icon:<FontAwesomeIcon icon={faCheck} />,onClick:()=>{} }
                           ]}  />}
              />


            </WTable>
            <br/><br/>


            <WButton iconLeft={<FontAwesomeIcon icon={faCheck} />} iconRight={<FontAwesomeIcon icon={faUserEdit} />} label={"Show toast"} onClick={showToast} />
            <br />
            <WButton styleType={"unlevated"} label={"Unelevated"} />
            <br />
            <WButton styleType={"flat"} label={"Flat"} />
            <br />
            <WButton bgColor={"successBg"} fgColor={"successFg"} styleType={"outlined"} label={"Outlined"} />
            <br />
            <WButton onClickOutside={()=>setMenuOpened(false)} onClick={()=>setMenuOpened(!menuOpened)} selected={menuOpened} label={"Open menu"}>
              <WMenu   position={"full-width-bottom"} opened={menuOpened}>
                <WList
                  listItems={[
                    {label:"Option 1"},
                    {label:"Option 2"}
                  ]}
                />
              </WMenu>
            </WButton>
            <br />
            <WButton onClick={()=>setPopupOpened(true)} label={"Open popup"}/>
            <WPopup opened={popupOpened} onClose={()=>setPopupOpened(false)}>
              a
            </WPopup>
            <br />
            <br/><br/>
      </WLayout>
    </ThemeProvider>
  )
}

export default App
