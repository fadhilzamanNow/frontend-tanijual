import React from 'react'
import { GridToolbarContainer, GridPrintExportMenuItem} from '@mui/x-data-grid';
import { MdOutlineLocalPrintshop } from "react-icons/md";


const NyobaGrid = () => {
  return (
    <GridToolbarContainer>
          <MdOutlineLocalPrintshop size={30} color='black'/>
        <GridPrintExportMenuItem options={{hideToolbar : true, fileName : "", copyStyles : true}}  />
    </GridToolbarContainer>
  )
}









export default NyobaGrid