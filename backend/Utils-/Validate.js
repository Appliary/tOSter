export function Integer(property, value) {
  if(!Number.isSafeInteger(value)) {
    throw new Error(`The "${property}" property should be an integer and is required.`);
  }
}

export function ObjectProps(property, value, allowed) {
  const unknownProps = Object
    .keys(value)
    .filter(key => !allowed.includes(key));

  if (unknownProps.length) {
    throw new Error(`Property "${property}.${unknownProps[0]}" not allowed.`);
  }
}
