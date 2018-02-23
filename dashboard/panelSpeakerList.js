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

    const { replicant } = props;
    if (replicant) {
      this.unsubscribe = replicant.on('change', newValue => this.setState({ value: newValue }));
      this.state.replicant = replicant;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.replicant) {
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

    const { replicant } = props;
    if (replicant) {
      this.unsubscribe = replicant.on('change', newValue => this.setState({ isChecked: newValue }));
      this.state.replicant = replicant;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.replicant) {
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


ReactDOM.render( (
    <form>
      <Row valign>
        <Column s10>
          <div className="right-align" style={{ fontWeight: 'bolder' }}>Entire Omnibar</div>
        </Column>
        <Switch s2 id="omnibarSwitch" replicant={nodecg.Replicant('omnibarSwitch', { persist: true })} className="right-align white-text" />
      </Row>
      <Row valign>
        <Input s10 label="Text" id="omnibarText" replicant={nodecg.Replicant('omnibarText', { persist: true })} />
        <Switch s2 id="omnibarTextSwitch" replicant={nodecg.Replicant('omnibarTextSwitch', { persist: true })} className="right-align" />
      </Row>
    </form>
  ),
  document.getElementById('root')
);

