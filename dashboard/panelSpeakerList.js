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
      // We will get the correct value in return from Replicant backend soon,
      // however we need to set the value immediately or risk React changing
      // the value back and forth between old and new value, which again causes
      // the cursor to move to the end of the input field.
      // https://stackoverflow.com/questions/28922275/in-reactjs-why-does-setstate-behave-differently-when-called-synchronously/28922465#28922465
      this.setState({ value });
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
    this.state = { isChecked: false };

    if (props.id) {
      const { replicant = nodecg.Replicant(props.id, { persist: true }) } = props;

      //console.log("switch replicant", replicant);
      this.unsubscribe = replicant.on('change', newValue => this.setState({ isChecked: newValue }));
      this.state.replicant = replicant;
    }
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

class Range extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
    // this.id = label => `${label}_${props.num}`;

    if (props.id) {
      const { replicant = nodecg.Replicant(props.id, { persist: true }) } = props;

      //console.log("switch replicant", replicant);
      this.unsubscribe = replicant.on('change', newValue => this.setState({ value: newValue }));
      this.state.replicant = replicant;
    }
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
        this.setState({ value: newValue })
      });
      this.setState({ replicant: nextProps.replicant });
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
}

class Talk extends React.Component {
  constructor(props) {
    super(props);
    this.id = label => `${label}_${props.num}`;
  }

  componentDidMount() {
    // For some reason we need to wait a little before firing updateTextFields
    // or else it doesn't have any effect. Calling this function makes the
    // labels move out of the way for existing/pre-filled text.
    setTimeout(() => Materialize.updateTextFields(), 1000);
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 2, // Creates a dropdown of x years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: true, // Close upon selecting a date,
    });
  }

  render() {
    const { title, num, active } = this.props;
    const { id } = this;

    const setActiveState = active ? 'disabled' : '';

    const Card = ({ children, active }) => {
      const activeClass = active ? 'green accent-1' : '';
      return (
        <Column s12 className={`card ${activeClass}`}>
          <div className="card-content" style={{ overflow: 'hidden' }}>
            {children}
          </div>
        </Column>
      );
    };


    return (
      <Row packed>
        <Card active={active}>
          <Row packed>
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

          <Row packed>
            <Input s4 label="Speaker Name" id={id('speaker_name')}/>
            <Input s8 label="Presentation Title" id={id('pres_title')}/>
          </Row>
        </Card>
      </Row>
    );
  }
}


$(document).ready(() => ReactDOM.render((
  <Row>
    <form className="col s12">
      <Row packed>
        <Input s8 label="Event Title" id="event_title"
          replicant={new ComplexReplicant({
            replicant: nodecg.Replicant('event_title'),
            marshal: (repl, val) => { console.log("SENDING", val); repl.value = val },
            unmarshal: (cb, val, a, b, c) => { console.log("GOT BACK", val);  cb(val); },
          })}/>

        <Column s4 className="input-field valign-wrapper">
          <input type="text" id={'event_date'} className="datepicker" />
          <label for={'event_date'} className="active">Event Date</label>
        </Column>
      </Row>

      <Talk num='1' />
      <Talk num='2' active />
      <Talk num='3' />
      <Talk num='4' />

    </form>
  </Row>
  ),
  document.getElementById('root')
));

