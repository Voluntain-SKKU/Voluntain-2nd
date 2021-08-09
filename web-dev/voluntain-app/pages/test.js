import { SideBar } from '../components/SideBar'
import { NavigationBar } from '../components/NavigationBar'

import Hidden from '@material-ui/core/Hidden';

export default function Page() {
    return (
      <div>
        <div className="Head">
          <NavigationBar />
        </div>
  
        <div className="Body">
          <div className="LeftSide" style={{ float: 'left' }}>
            <Hidden smDown>
              <SideBar height={1000} width={200} />
            </Hidden>
          </div>
        </div>
      </div>
    )
  }