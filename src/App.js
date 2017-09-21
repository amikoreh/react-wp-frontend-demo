import React, { Component } from 'react';

const RawHTML = ({children, className = ""}) => {
return <div className={className}
  dangerouslySetInnerHTML={{ __html: children.replace(/\n/g, '<br />')}} />
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    }
  }

  componentDidMount() {
    let dataURL = "http://devamikoreh.dev/wp-json/wp/v2/projects?_embed";
    fetch(dataURL)
      .then(res => res.json())
      .then(res => {
        this.setState({
          projects: res
        })
      })
  }

  render() {
    let projects = this.state.projects.map((project, index) => {
      return <div className='col-xs-12 col-sm-6 col-md-4 mix' key={index}>
      <div className='grid mask'>
      <img src={project._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url} alt={project.title.rendered} />
      <p><strong>Title:</strong> {project.title.rendered}</p>
      <div><strong>Description:</strong><div dangerouslySetInnerHTML={ {__html: project.acf.description} } /></div>
      <RawHTML>{project.content.rendered}</RawHTML>
      <div>{project.link}</div>
      </div>
      </div>
    });

    return (
      <div>
        <h2>Projects</h2>
        {projects}
      </div>
    )
  }
}

export default App;
