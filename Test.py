"""
urun=[1000,2000,3000,4000,5000]
def yeni(urun,oran):
    return yeni_urun(urun*oran)

for i in urun:
    i > 3000
"""

example = [1000, 2000, 3000, 4000, 5000]

def calculate(example):
    results = []
    for i in example:
        if i < 3000:
            new = i * 0.15
        else:
            new = i * 0.05
        results.append(new)
    return results

print(calculate(example))
