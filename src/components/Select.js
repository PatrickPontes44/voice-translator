
export default function Select(props) {
    
    const onSelect = (evt)=>{
        props.onChange(evt.target.value)
    }

    return (
            <div className="w-full md:w-1/2">
                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 text-base">{ props.label }</label>
                <select onChange={onSelect} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    {
                        props.values.map((countrie)=>{
                            return(
                                <option key={countrie[0]} value={countrie[0]}>{ countrie[1] }</option>
                            )
                        })
                    }
                </select>
            </div>
        )
  }
  