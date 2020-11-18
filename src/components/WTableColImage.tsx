import React from 'react';
import WTableCol, {TableColProps} from './WTableCol';
import WImage from './WImage';


interface TableColImageProps extends Omit<TableColProps,'body'|'sortable'>
{

}

export default function WTableColImage(props:TableColImageProps) {

    function Body(value:any):React.ReactNode
    {
        return (
            <WImage elevated src={value || "https://photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg"} />
        );
    }

    return (
        <WTableCol {...props} body={(props)=>Body(props?.value)}/>
    )
}

