import React, {  useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload,faTimes } from '@fortawesome/free-solid-svg-icons';
import WField, { FieldProps} from './WField';
import WImage from './WImage';
import WButton from './WButton';
import WTextField from './WTextField';
import { useId } from "react-id-generator";
import _ from 'lodash';
import prettyBytes from 'pretty-bytes';

interface FileStyleProps
{
    withPreview?:boolean
}

const Container = styled.div`

`;

const FileList = styled.div`

display:grid;
grid-gap:10px;
`;
const File = styled.div<FileStyleProps>`
display: grid;
background: #eeeeee;
border-radius: 5px;
${props => {

    return props.withPreview ? `
    grid-template-columns: 200px 1fr;

    @media screen and (max-width:600px)
    {
        grid-template-columns: 1fr;
    }
    `:
    `
    grid-template-columns:1fr;
    `;

}}

`;
const FileData = styled.div`
padding: 20px;
display: grid;
grid-gap: 20px;
grid-template-rows: 1fr;
`;

/*
const FileName = styled.div`
font-weight:600;
`;*/
const FileSize = styled.div``;

const Empty = styled.div`
font-weight:600;
text-align:center;
padding:30px;
background: #eeeeee;
`;
const Toolbar = styled.div`
padding: 10px;
background: #212121;
display: grid;
grid-template-columns: repeat(auto-fill,minmax(180px,1fr));
`;
const Video = styled.video`
width: 100%;
display: block;
height:100%;
object-fit:cover;
`;
export type File =
{
    _id?:string,
    name:string,
    size:number,
    type:string,
    file:globalThis.File,
    ext?:string
}


interface FileUploadFieldProps extends Omit<FieldProps,'children'|'labelId'|'validationType'>
{
    onChange?:(value:File | File[])=>any,
    multiple?:boolean,
    max?:number,
    emptyMessage?:string,
    allowedExtensions?:string[],
    fileFields?:(index:number,file:File)=>React.ReactNode
}

export default function WFileUploadField(props:FileUploadFieldProps) {
    let fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = Boolean(props.multiple);

    const [value, setValue] = useState<File[]>(props.value && !Array.isArray(props.value) ? [props.value] : props.value || []);
    const [htmlId] = useId();
    //const didMountRef = useRef(false);

    fileInput.addEventListener('change',()=>{
        if(fileInput.files)
        {
            let files = _.clone(value);

            for(let i = 0;i<=fileInput.files.length;i++)
            {
                let file = fileInput.files.item(i);
                
                if(file){

                    let extSplit = file.name.split('.');
                    let ext =  extSplit[extSplit.length - 1];

                    if (!props.allowedExtensions || props.allowedExtensions.indexOf(ext) > -1)
                    files.push({
                        name:file.name,
                        size:file.size,
                        type:file.type.split('/')[0],
                        file,
                        ext
    
                    });
                }

            }
            
            setValue(files);
            props.onChange?.(props.multiple ? files : files[0])
        }

    });

    function removeFile(key:number)
    {
        let files = _.clone(value);
        files.splice(key,1);
        setValue(files);
        props.onChange?.(props.multiple ? files : files[0])
    }

    function getPreview(file:File):string
    {

        return URL.createObjectURL(file.file);
    }

    function openFileDialog()
    {
        fileInput.click();

    }

    function onChangeName(name:string | number | null, index:number)
    {
        let file = _.clone(value[index]);
        let files = _.clone(value);
        file.name = name ? name.toString() : '';
        files[index] = file;
        setValue(files);
        props.onChange?.(props.multiple ? files : files[0])
    }

    useEffect(()=>{
        setValue(props.value && !Array.isArray(props.value) ? [props.value] : props.value || []);
    },[props.value]);



    return (
        <WField value={value} labelId={htmlId} rules={props.rules} validationType={props.multiple ? 'array' : 'object' }  label={props.label}>
            <Container>

                <FileList>
                    {value.length ==  0 && 
                        <Empty>
                            {props.emptyMessage || 'No hay archivos subidos'}                            
                        </Empty>
                    }
                    {value.length > 0 &&
                        value.map((file,key) => 
                            <File key={file._id || key} withPreview={file.type === 'image' || file.type === 'video'}>
                                {file.type === 'image' && <WImage  height={'100%'}  src={getPreview(file)} />}
                                {file.type === 'video' && <Video src={getPreview(file)} />}
                                <FileData>
                                    <WTextField onChange={(value)=>onChangeName(value,key)} value={file.name}  />
                                    {props.fileFields?.(key,file)}
                                    <FileSize>{prettyBytes(file.size)}</FileSize>
                                    <WButton onClick={()=>removeFile(key)} style={{maxWidth:'130px',width:'100%',marginLeft:'auto'}}  label={'Eliminar'} size={'small'}  styleType={'unlevated'} bgColor={'red'} fgColor={'white'} iconRight={<FontAwesomeIcon icon={faTimes} />} />
                                </FileData>
                            </File>    
                        )
                    }
                </FileList>
                <Toolbar>
                    <WButton disabled={Boolean(props.max && value.length >= props.max)} onClick={()=>openFileDialog()} size={'small'} label={"Subir archivo"} bgColor={'green'} fgColor={'white'} bgHoverColor={'white'} fgHoverColor={'green'} styleType={'unlevated'} iconRight={<FontAwesomeIcon icon={faUpload} />} />
                </Toolbar>
            </Container>
        </WField>
    )
}

