const Row = ({ children, valign, className = '', packed }) => {
  const style = packed ? { marginBottom: '0px' } : {};
  return (
    <div className={`row ${valign ? "valign-wrapper" : ''} ${className}`} style={style}>{children}</div>
  );
}

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
      const cb = newValue => this.setState({ value: newValue });
      replicant.on('change', cb);
      this.unsubscribe = () => replicant.removeListener('change', cb);

      this.state.replicant = replicant;
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("input nextprops:", nextProps);
    if (!this.props.replicant && nextProps.replicant) {
      //console.log("nextProps.replicant", nextProps.replicant);
      if (this.unsubscribe) {
        // remember to remove old event listener:
        this.unsubscribe();
      }

      // get data from backend:
      const { replicant } = nextProps;
      const cb = newValue => this.setState({ value: newValue });
      replicant.on('change', cb);
      this.unsubscribe = () => replicant.removeListener('change', cb);

      this.setState({ replicant: nextProps.replicant });
    }
  }

  render() {
    //console.log("active button render:", this.state, this.props);
    // set state indirectly (via replicant value, which in turn will set the value in state)
    const handleChange = ({ target: { value }}) => {
      if (this.state.replicant) { this.state.replicant.value = value }
      // We will get the correct value in return from Replicant backend soon,
      // however we need to set the value immediately or risk React changing
      // the value back and forth between old and new value, which again causes
      // the cursor to move to the end of the input field.
      // https://stackoverflow.com/questions/28922275/in-reactjs-why-does-setstate-behave-differently-when-called-synchronously/28922465#28922465
      this.setState({ value });
    };

    const { id, label } = this.props;
    const { value = '' } = this.state;

    return (
      <Column {...this.props} className="input-field">
        <input id={id} type="text" className="validate" onChange={handleChange} value={value} />
        <label for={id} className="active">{label}</label>
      </Column>
    );
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      // console.log(this.unsubscribe);
      // remember to remove old event listener:
      this.unsubscribe();
    }
  }
}

// ComplexReplicant acts as a middleware between the real Replicant value and
// the consumer. It needs a marshall and an unmarshall function that
// translates/maps between simple input/output and the real datastructure.
class ComplexReplicant {
  constructor(props = {}) {
    this.replicant = props.replicant;
    this.marshal = props.marshal;
    this.unmarshal = props.unmarshal;
  }

  on(eventName, callback) {
    //return this.replicant.on(eventName, callback);
    return this.replicant.on(eventName, newVal => this.unmarshal(callback, newVal));
  }

  set value(newValue) {
    return this.marshal(this.replicant, newValue);
  }
}

class Switch extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state = { isChecked: false };

    if (props.id) {
      const { replicant = nodecg.Replicant(props.id, { persist: true }) } = props;

      //console.log("switch replicant", replicant);
      const cb = newValue => this.setState({ isChecked: newValue });
      replicant.on('change', cb);
      this.unsubscribe = () => replicant.removeListener('change', cb);

      this.state.replicant = replicant;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.replicant && nextProps.replicant) {
      //console.log("switch nextProps.replicant", nextProps.replicant);
      if (this.unsubscribe) {
        // remember to remove old event listener:
        this.unsubscribe();
      }

      // get data from backend:
      const { replicant } = nextProps;
      const cb = newValue => this.setState({ isChecked: newValue });
      replicant.on('change', cb);
      this.unsubscribe = () => replicant.removeListener('change', cb);

      this.setState({ replicant: nextProps.replicant });
    }
  }

  handleChange({ target: { checked }}) {
    // set state indirectly (via replicant value, which in turn will set the value in state)
    if (this.state.replicant) {
      this.state.replicant.value = checked
    }
  }

  render() {
    const { isChecked } = this.state;
    const { onLabel, offLabel } = this.props;

    return (
      <Column {...this.props}>
        <div className="switch">
          <label>
            {offLabel}
            <input id="presenter_overlay_show" type="checkbox" onChange={this.handleChange} checked={isChecked} />
            <span className="lever"></span>
            {onLabel}
          </label>
        </div>
      </Column>
    );
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      // console.log(this.unsubscribe);
      // remember to remove old event listener:
      this.unsubscribe();
    }
  }
}

Switch.defaultProps = {
  offLabel: 'Hide',
  onLabel: 'Show',
};

class Range extends React.Component {
  constructor(props) {
    super(props);
    console.log("range constructor");
    this.state = { value: 0 };
    // this.id = label => `${label}_${props.num}`;

    if (props.id) {
      const { replicant = nodecg.Replicant(props.id, { persist: true }) } = props;

      //console.log("switch replicant", replicant);
      const cb = newValue => this.setState({ value: newValue });
      replicant.on('change', cb);
      this.unsubscribe = () => replicant.removeListener('change', cb);
      this.state.replicant = replicant;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.replicant && nextProps.replicant) {
      //console.log("switch nextProps.replicant", nextProps.replicant);
      if (this.unsubscribe) {
        // remember to remove old event listener:
        this.unsubscribe();
      }

      // get data from backend:
      const { replicant } = nextProps;
      const cb = newValue => this.setState({ value: newValue });
      replicant.on('change', cb);
      this.unsubscribe = () => replicant.removeListener('change', cb);

      this.setState({ replicant });
    }
  }

  render() {
    const { id, label, min = 0, max = 60, className = ''} = this.props;
    const { value } = this.state;

    // set state indirectly (via replicant value, which in turn will set the value in state)
    const handleChange = ({ target: { value }}) => {
      if (this.state.replicant) { this.state.replicant.value = value }
    };

    return (
      <Column {...this.props} className={`input-field center-align ${className}`}>
        <div className="range-field valign-wrapper" style={{ width: "100%" }}>
          <input id={id} type="range" min={min} max={max} value={value} onInput={handleChange} />
        </div>
        <label for={id} className="active">{label}: {value}</label>
      </Column>
    );
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      // console.log(this.unsubscribe);
      // remember to remove old event listener:
      this.unsubscribe();
    }
  }
}

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    console.log("datepicker constructor");
    this.state = { value: '' };

    if (props.id) {
      const { replicant = nodecg.Replicant(props.id, { persist: true }) } = props;

      const cb = timestamp => this.setState({ value: new Date(timestamp) });
      replicant.on('change', cb);
      this.unsubscribe = () => replicant.removeListener('change', cb);

      this.state.replicant = replicant;
    }
  }

  componentDidMount(){
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 2, // Creates a dropdown of x years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: true, // Close upon selecting a date,
    })
      .pickadate('picker')
      .on('set', data => {
        this.setState({ value: new Date(data.select) });
        if (this.state.replicant) { this.state.replicant.value = data.select }
      })
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.replicant && nextProps.replicant) {
      //console.log("switch nextProps.replicant", nextProps.replicant);
      if (this.unsubscribe) {
        // remember to remove old event listener:
        this.unsubscribe();
      }

      // get data from backend:
      const { replicant } = nextProps;
      const cb = timestamp => this.setState({ value: new Date(timestamp) });
      replicant.on('change', cb);
      this.unsubscribe = () => replicant.removeListener('change', cb);

      this.setState({ replicant: nextProps.replicant });
    }
  }

  render() {
    const { id, label, className = ''} = this.props;
    const { value } = this.state;

    return (
      <Column {...this.props} className={`input-field valign-wrapper ${className}`}>
        <input type="text" id={id} className="datepicker" value={value} />
        <label for={id} className="active">{label}</label>
      </Column>
    );
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      // console.log(this.unsubscribe);
      // remember to remove old event listener:
      this.unsubscribe();
    }
  }
}

const Card = ({ children, active }) => {
  const activeClass = active ? 'green accent-1' : '';
  return (
    <Column s12 className={`card ${activeClass}`}>
      <div className="card-content" style={{ overflow: 'hidden', padding: '24px 12px' }}>
        {children}
      </div>
    </Column>
  );
};

class Talk extends React.Component {
  constructor(props) {
    super(props);
    console.warn("talk constructor");
    this.id = label => `${label}_${props.num}`;

    // replicant for tracking active/current:
    const { replicant = nodecg.Replicant('active_talk', { persist: true }) } = props;

    const cb = number => this.setState({ active: number });
    replicant.on('change', cb);
    this.unsubscribe = () => replicant.removeListener('change', cb);

    this.state = {
      active: props.active,
      replicant,
    };
  }

  componentDidMount() {
    // For some reason we need to wait a little before firing updateTextFields
    // or else it doesn't have any effect. Calling this function makes the
    // labels move out of the way for existing/pre-filled text.
    setTimeout(() => Materialize.updateTextFields(), 1000);
  }

  render() {
    // console.log("talk render:", this.state, this.props);
    const { title, num } = this.props;
    const { active, replicant } = this.state;
    const { id } = this;

    const isActive = active == num;
    const setActiveState = isActive ? 'disabled' : '';

    return (
      <Row packed>
        <Card active={isActive}>
          <Row packed>
            <Column s7>
              <span className="card-title">
                Talk #{num}
                <a className="waves-effect waves-teal btn-flat red-text">Delete</a>
              </span>
            </Column>
            <Column s3 className="right-align">
              <a className={`waves-effect waves-teal btn ${setActiveState}`} onClick={() => { replicant.value = num }}>Set as Active</a>
            </Column>

            <Switch s2 id={id('talkActive')} className="right-align" onLabel="Enable" offLabel="Disable" />
          </Row>

          <Row packed>
            <Input s4 label="Speaker Name" id={id('speaker_name')}/>
            <Input s8 label="Presentation Title" id={id('pres_title')}/>
          </Row>
        </Card>
      </Row>
    );
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      // console.log(this.unsubscribe);
      // remember to remove old event listener:
      this.unsubscribe();
    }
  }
}


const SpeakerList = () => {
  console.warn("render speakerlist");
  return (
  <Row>
    <form className="col s12">
      <Row packed>
        {/*
        <Input s8 label="Event Title" id="event_title"
          replicant={new ComplexReplicant({
            replicant: nodecg.Replicant('event_title', { persist: true }),
            marshal: (repl, val) => { console.log("SENDING", val); repl.value = val },
            unmarshal: (cb, val, a, b, c) => { console.log("GOT BACK", val); cb(val); },
          })}/>
          */}

        <Input s8 label="Event Title" id="event_title2" />
        <DatePicker s4 label="Event date" id="event_date" />
      </Row>

      <Talk num='1' />
      <Talk num='2' />
      <Talk num='3' />
      <Talk num='4' />

    </form>
  </Row>
  );
};

$(document).ready(() => ReactDOM.render(
  <SpeakerList />,
  document.getElementById('root')
));
