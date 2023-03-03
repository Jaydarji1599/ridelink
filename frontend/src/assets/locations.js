export const LOCATIONS = [
    "HALIFAX",
    "ANTIGONISH",
    "TRURO",
    "NEW GLASGOW",
    "SYDNEY",
    "MONCTON",
    "FREDERICTON",
    "CHARLOTTETOWN"
]

export function generateOptionsFromLocations(loc) {

    const content = loc.map(l => (
        <option>{l}</option>
    ))

    return (
        <>
          {content}  
        </>
    )
}