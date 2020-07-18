import React from "react";

export default class FetchSuitcase extends React.Component {
   
  state = {
    loading: true,
    suitcase: []
  };

  async componentDidMount() {
    var x = 1;
    const url = "http://localhost:58392/api/users/"+x+"/Suitcase";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ suitcase: data, loading: false });
    console.log(data);
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.suitcase) {
      return <div>didn't get a person</div>;
    }

    

    return (
      <div>
        {this.state.suitcase.map(suitcase => (
                <div key={suitcase.idTrip}>       
                  <div key={suitcase.idTrip}>  
                    <div>{suitcase.start}</div>                   
                  </div>
                </div>                               
            ))}  
      </div>
    );
  }
}