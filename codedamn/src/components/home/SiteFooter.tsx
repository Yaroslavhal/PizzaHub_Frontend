const SiteFooter = () => {
    return(
        <>
            <footer>
            <div style={
                {
                    marginTop: "50px",
                    paddingTop: "20px",
                    height: "200px", 
                    width: "100%", 
                    backgroundColor: "lightgray",
                    textAlign: "center",
                    fontSize: "20px",
                }}>

                ©2023 Pizzahub International, Inc. All Rights Reserved.<br></br>               
                Canada: Adults and youth (ages 13 and older) need an average of 2,000 calories a day,<br></br>
                and children (ages 4 to 12) need an average of 1,500 calories a day. However, individual needs vary.<br></br>
                LinkedIn: <a href="https://www.linkedin.com/in/yaroslav-halushko">https://www.linkedin.com/in/yaroslav-halushko</a> <br></br>
                Support: +1 (929) 410-9720
                </div>
            </footer>
        </>
    )

}

export default SiteFooter;