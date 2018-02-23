const Row = ({ children, valign, className = ''}) => (
  <div className={`row ${valign ? "valign-wrapper" : ''} ${className}`}>{children}</div>
);

const Column = ({ s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, className, children }) => {
  const width =
    s1 && "s1" ||
    s2 && "s2" ||
    s3 && "s3" ||
    s4 && "s4" ||
    s5 && "s5" ||
    s6 && "s6" ||
    s7 && "s7" ||
    s8 && "s8" ||
    s9 && "s9" ||
    s10 && "s10" ||
    s11 && "s11" ||
    "s12";

  return (
    <div className={`col ${width} ${className||''}`}>
      {children}
    </div>
  );
}

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: '' };

    if (props.id) {
      const { replicant = nodecg.Replicant(props.id, { persist: true }) } = props;

      //console.log("replicant", replicant, props);
      this.unsubscribe = replicant.on('change', newValue => this.setState({ value: newValue }));
      this.state.replicant = replicant;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.replicant) {
      //console.log("nextProps.replicant", nextProps.replicant);
      if (this.unsubscribe) {
        // remember to remove old event listener:
        this.unsubscribe();
      }

      // get data from backend:
      this.unsubscribe = nextProps.replicant.on('change', newValue => {
        this.setState({ value: newValue })
      });
      this.setState({ replicant: nextProps.replicant });
    }
  }

  render() {
    // set state indirectly (via replicant value, which in turn will set the value in state)
    const handleChange = ({ target: { value }}) => {
      if (this.state.replicant) { this.state.replicant.value = value }
    };

    const { s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12 } = this.props;

    const width =
      s1 && "s1" ||
      s2 && "s2" ||
      s3 && "s3" ||
      s4 && "s4" ||
      s5 && "s5" ||
      s6 && "s6" ||
      s7 && "s7" ||
      s8 && "s8" ||
      s9 && "s9" ||
      s10 && "s10" ||
      s11 && "s11" ||
      "s12";

    const { id, label } = this.props;
    const { value = '' } = this.state;

    return (
      <Column {...this.props} className="input-field">
        <input id={id} type="text" className="validate" onChange={handleChange} value={value} />
        <label for={id} className="active">{label}</label>
      </Column>
    );
  }
}

class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isChecked: false };

    if (props.id) {
      const { replicant = nodecg.Replicant(props.id, { persist: true }) } = props;

      //console.log("switch replicant", replicant);
      this.unsubscribe = replicant.on('change', newValue => this.setState({ isChecked: newValue }));
      this.state.replicant = replicant;
    }
  }

  componentDidMount() {
    // Materialize.updateTextFields();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.replicant) {
      //console.log("switch nextProps.replicant", nextProps.replicant);
      if (this.unsubscribe) {
        // remember to remove old event listener:
        this.unsubscribe();
      }

      // get data from backend:
      this.unsubscribe = nextProps.replicant.on('change', newValue => {
        this.setState({ isChecked: newValue })
      });
      this.setState({ replicant: nextProps.replicant });
    }
  }

  render() {
    // set state indirectly (via replicant value, which in turn will set the value in state)
    const handleChange = ({ target: { checked }}) => {
      if (this.state.replicant) { this.state.replicant.value = checked }
    };

    const { isChecked } = this.state;
    return (
      <Column {...this.props}>
        <div className="switch">
          <label>
            Hide
            <input id="presenter_overlay_show" type="checkbox" onChange={handleChange} checked={isChecked} />
            <span className="lever"></span>
            Show
          </label>
        </div>
      </Column>
    );
  }
}

class Talk extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, num, active } = this.props;
    const id = label => `${label}_${num}`;

    const activeClass = active ? 'green accent-1' : '';
    const setActiveState = active ? 'disabled' : '';
    return (
        <Row>
          <div className={`card col s12 ${activeClass}`}>
            <div className="card-content" style={{ overflow: 'hidden' }}>
              <Row>
                <Column s7>
                  <span className="card-title">
                    Talk #{num}
                    <a className="waves-effect waves-teal btn-flat red-text">Delete</a>
                  </span>
                </Column>
                <Column s3 className="right-align">
                  <a className={`waves-effect waves-teal btn ${setActiveState}`}>Set as Active</a>
                </Column>
                <Switch s2 id={id('talkActive')} className="right-align" />
              </Row>
              <div>
                <Input s5 label="Speaker Name" id={id('speaker_name')}/>
                <Input s5 label="Presentation Title" id={id('pres_title')}/>
                <Column s2 className="input-field valign-wrapper">
                  <p className="range-field valign-wrapper">
                    <input id={id('length')} type="range" min="0" max="60" value="0" />
                  </p>
                  <label for={id('length')} className="active">Length (minutes)</label>
                </Column>
              </div>
            </div>
          </div>
        </Row>
    );
  }
}


ReactDOM.render( (
  <Row>
    <form className="col s12">
      <Row>
        <Input s12 label="Event Title" id="event_title" />
      </Row>

      <Talk num='1' />
      <Talk num='2' active />
      <Talk num='3' />
      <Talk num='4' />

    </form>
  </Row>
  ),
  document.getElementById('root')
);

