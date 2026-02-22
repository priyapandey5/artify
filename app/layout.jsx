import { Description } from "@mui/icons-material"
import "@styles/globals.css"
import Provider from "@components/Provider";

export const metadata = {
    title: "Artoria",
    description: "Where art finds its home"
}
const layout = ({children}) => {
  return (
    <html lang="en">
        <body>
        <Provider>
            <main>
                {children}
            </main>
          </Provider>
            
        </body>
    </html>
  )
}

export default layout
