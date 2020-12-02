import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import Field  from './WField';
import _ from 'lodash';
import { useId } from "react-id-generator";
import { ValidationError } from "fastest-validator"


const Canvas = styled.svg`
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
`;
const Container = styled.div`
width:100%;
height:100%;
user-select:none;
`;


interface CanvasLayer {
  name:string,
  type:('polygon'|'square'|'circle'),
  style?:{},
  maxItems?:number
}

export interface WCanvasProps
{
  //drawMode:('polygon'|'square'|'circle'),
  currentLayer?:string,
  layers: CanvasLayer[]
  onChange?:(polygonLayers:{ [layer:string]: [number,number][][] })=>any,
  polygons?:{ [layer:string]: [number,number][][]},
  max?:number,
  min?:number,
  children:React.ReactNode,
  label?:string,
  customValidationStatus?: ValidationError[] | true | undefined,
  onLayerSelect?:(layer:string)=>any
}


export default function WCanvas(props:WCanvasProps) {
  const [htmlId] = useId();
  const [polygonDraw, setPolygonDraw] = useState<[number,number][]>([]);
  //const [polygonArray, setPolygonArray] = useState<[number, number][][]>(props.polygons || []);
  const [polygonLayers, setPolygonLayers] = useState<{ [layer:string]: [number,number][][] }>(props.polygons || {});
  //polygonIndex:number
  const [selectedPolygonPoint, setSelectedPolygonPoint] = useState< {pointIndex:number,polygon?:{polygonIndex:number, polygonLayer:string}} >();
  const didMountRef = useRef(false);

  function getSelectedLayer() {
    let idx = props.layers.findIndex(layer => layer.name == props.currentLayer)

    return idx == -1 ? null : props.layers[idx]
  }

  function onClick(event:React.MouseEvent) {
    let selectedLayer = getSelectedLayer();
    if(!selectedLayer)
    {
      return;
    }

    let rect = event.currentTarget.getBoundingClientRect();
    let x = (event.clientX - rect.left) / rect.width;
    let y = (event.clientY - rect.top) / rect.height;

    switch (selectedLayer.type) {

      case 'polygon':
        if(selectedLayer.maxItems &&  polygonLayers[selectedLayer.name] && selectedLayer.maxItems <= polygonLayers[selectedLayer.name].length)
        {
          return;
        }

        addPolygonPoint(x,y)
      break;

    }
  }

  function onMouseMove(event:React.MouseEvent) {

    let selectedLayer = getSelectedLayer();
    if(!selectedLayer)
    {
      return;
    }


    let rect = event.currentTarget.getBoundingClientRect();
    let x = (event.clientX - rect.left) / rect.width;
    let y = (event.clientY - rect.top) / rect.height;

    switch (selectedLayer.type) {

      case 'polygon':
        if(event.buttons == 1)
        {
          dragPolygonPoint(x,y)
        }
        else if (selectedPolygonPoint)
        {
          setSelectedPolygonPoint(undefined);
        }
      break;

    }


  }

  function addPolygonPoint(x:number, y:number) {
    setPolygonDraw(polygonDraw.concat([[x,y]]))
  }

  function onClickPolygonPoint(index:number, event:React.MouseEvent) {
    if(index == 0)
    {
      savePolygon();
    }
    event.stopPropagation();
    event.preventDefault();
  }

  function onDoubleClickPolygonPoint(index:number, event:React.MouseEvent) {

    if(index == polygonDraw.length - 1)
    {
      savePolygon();
      event.stopPropagation();
    }
  }

  function savePolygon() {
    if(!props.currentLayer)
    {
      return;
    }

    if(polygonDraw.length >= 3)
    {
      let layers = _.clone(polygonLayers);
      layers[props.currentLayer] = layers[props.currentLayer] ? layers[props.currentLayer].concat([polygonDraw]) : [polygonDraw];
      setPolygonLayers(layers);
      setPolygonDraw([]);
    }
  }

  function dragPolygonPoint(x:number, y:number)
  {
    if(!props.currentLayer)
    {
      return;
    }

    if(selectedPolygonPoint)
    {

      if(typeof selectedPolygonPoint?.polygon?.polygonLayer !== "undefined" ) {
        let layers = _.clone(polygonLayers);
        let layer = layers[selectedPolygonPoint.polygon.polygonLayer];
        if(layer)
        {
          layer[selectedPolygonPoint.polygon.polygonIndex][selectedPolygonPoint.pointIndex] = [x,y];
          layers[selectedPolygonPoint.polygon.polygonLayer] = layer;
          setPolygonLayers(layers);
        }
      }
      else
      {
        setPolygonDraw(_.clone(_.set(polygonDraw,`${selectedPolygonPoint.pointIndex}`,[x,y])))
      }
    }
  }

  function onDoubleClickPolygon(polygonIndex:number, layerName:string) {

    let layers = _.clone(polygonLayers);
    let layer = layers[layerName];
    layer.splice(polygonIndex,1);
    layers[layerName] = layer;
    setPolygonLayers(layers);
  }

  /*
  function getValidationRules()
  {
    let rules = {
      type:'object',
      props:{
        polygonArray:{type:'array'}
      }
    };

    if(props.min)
    {
      rules.props.polygonArray['min'] = props.min;
    }

    if(props.max)
    {
      rules.props.polygonArray['max'] = props.max;
    }

    return rules;
  }*/


  function getLayer(name:string) {
    let index = props.layers.findIndex(l => l.name == name);
    if(index == -1)
    {
      return null;
    }
    return props.layers[index]
  }


  useEffect(()=>{
    if (didMountRef.current)
    {
      props.onChange?.(polygonLayers);
    }
    else
    {
      didMountRef.current = true;
    }
  },[polygonLayers]);

  useEffect(()=>{
    console.log(polygonLayers,props.polygons);
    if(JSON.stringify(polygonLayers) !== JSON.stringify(props.polygons))
    {
      setPolygonLayers(props.polygons || {});
    }
  },[props.polygons]);

  return (
    <Field customValidationStatus={props.customValidationStatus} label={props.label} labelId={htmlId} validationType={"object"}  >


      <Container>
        {props.children}
        <Canvas viewBox=" 0 0 100 100" onClick={onClick} onMouseMove={onMouseMove}  preserveAspectRatio={"none"} >


          {Object.values(polygonLayers).map((polygonArray,layerIndex)=>
            polygonArray && polygonArray.map((polygon,polygonIndex) =>
              <React.Fragment key={JSON.stringify(polygon)}>
                <polygon onClick={(event:React.MouseEvent)=>{ event.stopPropagation(); }}
                         onDoubleClick={()=>{  onDoubleClickPolygon(polygonIndex, Object.keys(polygonLayers)[layerIndex]) }}
                         points={polygon.map(point => `${point[0]*100},${point[1]*100}`).join(" ")}
                         style={getLayer(Object.keys(polygonLayers)[layerIndex])?.style || {stroke:'black',fill:'rgba(0,0,0,0.5)',strokeWidth:'1px'}}
                />
                {polygon.map((point,pointIndex)=>
                  {return <circle
                    onMouseDown={()=>{ props.onLayerSelect?.(Object.keys(polygonLayers)[layerIndex]); setPolygonDraw([]);setSelectedPolygonPoint({pointIndex, polygon:{polygonIndex,polygonLayer:Object.keys(polygonLayers)[layerIndex]} })}}
                    style={{cursor:'grab'}}
                    key={pointIndex}
                    cx={point[0] * 100}
                    cy={point[1] * 100}
                    r="0.75"
                    fill="blue" />}
                )}
              </React.Fragment>
            )
          )}

          {polygonDraw.length > 1 &&
            <polyline style={{fill:'none',stroke:'black',strokeWidth:0.6}} points={polygonDraw.map(point => `${point[0] * 100},${point[1] * 100}`).join(" ")} />
          }
          {polygonDraw.map((point,index) =>
            <circle onMouseDown={()=>{ setSelectedPolygonPoint({pointIndex:index})}} onDoubleClick={(event:React.MouseEvent)=>{onDoubleClickPolygonPoint(index,event)}} onClick={(event:React.MouseEvent)=>{onClickPolygonPoint(index,event)}} key={index} cx={point[0] * 100} cy={point[1] * 100} r="0.75" fill="red" />
          )}


        </Canvas>
      </Container>

    </Field>
  )
}

