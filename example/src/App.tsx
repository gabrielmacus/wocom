import React, { useEffect, useState } from 'react'

//
import {File,renderToast,WFileUploadField,WTableColImage,WList,WMenu,WTableColActions,WPopup,WImage,WCanvas,WTitle,WSidemenu,WLayout,WButton,WTextField,WSelectField,WSelectFieldOption,WForm,WTable,WTableCol,WRatingField,WCheckRadio, DefaultTheme } from 'wocom'
import {ThemeProvider} from 'styled-components';
import 'wocom/dist/index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit,faTrash,faCheck,faUser, faCalculator} from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash';

interface CustomFile extends File
{
  description?:string
}

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
  const [item,setItem] = useState<{language?:number,name?:string,interests:string[],files?:CustomFile[]}>({files:[
    {
      "id": "5fbfdc8600a7ba0ee0965eab",
      "name": "ABC",
      "size": 0,
      "type": "image",
      "ext": "jpg",
      "url": "http://192.168.0.2/2020\\11\\26\\1606409350409_0.1187860330767696.jpg"
    }
  ],interests:[]});

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

  //let formData = new FormData();
  function onFile(files:File[])
  {
    setItem({...item,...{files}});

    /*
    let i = 0;
    for(const file of (files as File[]))
    {
      formData.append(`files[${i}][file]`,file.file);

      i++;
    }

    console.log(formData)*/
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
                 {label:'Users',href:'https://google.com.ar',icon:<FontAwesomeIcon icon={faUser} />},
                 {label:'Products',href:'https://google.com.ar',icon:<FontAwesomeIcon icon={faCalculator} />,items:[
                   {label:'List products',href:'http://wikipedia.org',active:true},
                   {label:'Add product',icon:<FontAwesomeIcon icon={faTrash} /> ,href:'http://npmjs.com'}
                 ]}
                 ]} />} >
        {/*style={{maxWidth:"900px",margin:"auto",width:"90%"}}*/}

            <WTitle>Demo title</WTitle>
            
            <WForm onSubmit={onSubmit}>
              <WTextField rules={{}} value={item.name}  onChange={(val)=>setItem({...item,...{name:val?.toString()}})} label="Name"></WTextField>
              <WFileUploadField 
              value={item.files}
              fileFields={()=><WTextField  label="Detalles (opcional)" />}
              max={2} allowedExtensions={['jpg','jpeg','png']} onChange={onFile} multiple rules={{max:2}}    label="Pictures" />
              <WButton type="submit" label="Aceptar"></WButton>
            </WForm>
            <br/>
            <WForm>
              {/*style={{width:"100%",display:"grid",gridTemplateColumns:"1r",gridGap:"1.5rem"}}*/}

              <WTextField debounce={1500} onChange={(val)=>console.log("VAL",val)} value={name} rules={{max:120}} label="Nombre"></WTextField>
              <WTextField rules={{max:120}} label="Apellido"></WTextField>

              <WTitle level={2} borderBottom >Datos del cliente</WTitle>

              <WTextField rules={{min:20,max:100,positive:true,integer:true}}  validationType="number" maskOptions={{mask:[/\d/,/\d/],guide:false}}  label="Edad"></WTextField>
              <WTextField rules={{optional:true,min:10,max:500}} label="Descripción" textarea></WTextField>
              <WSelectField onChange={(val)=>setItem({...item,...{language:val}})} rules={{type:'number'}} label="Lenguajes de programación">
                <WSelectFieldOption selected={item.language == 1} value={1} label="Javascript" />
                <WSelectFieldOption selected={item.language == 2} value={2} label="Python" />
                <WSelectFieldOption selected={item.language == 3} value={3} label="C#" />
              </WSelectField>
              <WSelectField  onChange={(val)=>setItem({...item,...{interests:val}})} multiple rules={{type:'array'}} label="Intereses">
                <WSelectFieldOption selected={item.interests.findIndex(i => i == "Football") > -1} value={"Football"} label="Football" />
                <WSelectFieldOption selected={item.interests.findIndex(i => i == "Kayaking") > -1} value={"Kayaking"} label="Kayaking" />
                <WSelectFieldOption selected={item.interests.findIndex(i => i == "Skateboarding") > -1} value={"Skateboarding"} label="Skateboarding" />
              </WSelectField>
              <WRatingField rules={{min:1,max:5}}    label="Calificación"  />
              <WCheckRadio type={'checkbox'} label="Zanahoria" />

              <button onClick={()=>{setCanvasLayer('f3')}}>F3</button>
              <button onClick={()=>{setCanvasLayer('f2')}}>F2</button>

              
              {canvasLayer}

              <WCanvas 
              currentLayer={canvasLayer}
              onLayerSelect={(layer)=>setCanvasLayer(layer)}
              polygons={{"f3":[ [[0,0.1],[0.1,0.1],[0.2,0.2],[0.1,0.2]]  ]}}  
              label={"Regions of interest"}  
              layers={[{type:'polygon',name:'f3'},{maxItems:1,type:'polygon',name:'f2',style:{stroke:'none',fill:'rgba(255,120,32,0.5)'}}]}  >
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

            <WTable breakpoint={'768px'} title="Users" items={[{name:'John',surname:'Doe',age:25},{name:'John',surname:'Doe',age:25},{name:'John',surname:'Doe',age:25}]}>
              <WTableCol width="33%" prop="name" header="Name" />
              <WTableCol width="33%" prop="surname" header="Surname" />
              <WTableCol width="33%" prop="age" header="Age" />
            </WTable>

            <br/> <br/>


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
