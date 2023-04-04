import csv
from fastapi import APIRouter

router = APIRouter()


@router.get("/curveIV")
async def get_curveIV():
    with open('Mediciones con luz.csv') as csvfile:
        data = csv.reader(csvfile, delimiter=',')
        x = []
        y = []
        for row in data:
            x.append(row[0])
            y.append(row[1])

    # Remove first element of each array
    x.pop(0)
    y.pop(0)
    # Parse arrays to float
    x = [float(i) for i in x]
    y = [float(i) for i in y]

    return {"x": x, "y": y}
