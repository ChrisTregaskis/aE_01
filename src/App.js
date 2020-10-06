import React from 'react';
import './App.css';
import DefaultButton from "./Components/DefaultButton/DefaultButton";
import Results from "./Components/Results/Results";
import testData from './dartTestData.json';
import PerformanceAverages from "./Components/PerformanceAverages/PerformanceAverages";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataPackage: {},
            groupKeys: [],
            groupCounts: [],
            groupValue: '?',
            countValue: 0,
            speedValue: 0,
            binarySpeedAll: [],
            linearSpeedAll: [],
            binaryClickCount: 0,
            linearClickCount: 0
        }
    }

    componentDidMount() { this.setData(); }

    executeBinary = () => {
        let t0 = performance.now();
        this.resetGroupCounts();
        let selections = this.state.dataPackage.selections;

        for (let i=0; i<selections.length; i++) {
            let target = selections[i]
            this.binarySearchGroups(target)
        }

        this.updateTopStatus()
        let t1 = performance.now();
        this.updateSpeed(t0, t1)
        this.addToSpeedArray('binary', t0, t1)
    }

    executeLinear = () => {
        let t0 = performance.now();
        this.resetGroupCounts();
        let selections = this.state.dataPackage.selections;

        for (let i=0; i<selections.length; i++) {
            let target = selections[i]
            this.linearGroupsIteration(target)
        }

        this.updateTopStatus()
        let t1 = performance.now();
        this.updateSpeed(t0, t1)
        this.addToSpeedArray('linear', t0, t1)
    }

    binarySearchGroups = (target) => {
        let groupsObj = this.state.dataPackage.groups;
        let groupsEntries = Object.entries(groupsObj)

        for (let i=0; i<groupsEntries.length; i++) {
            let currentGroupKey = groupsEntries[i][0];
            let currentGroupData = groupsEntries[i][1];
            currentGroupData.sort(new Intl.Collator('en',{ numeric:false }).compare)
            let low = 0;
            let high = currentGroupData.length;
            let targetFound = false
            targetFound = this.binarySearch(currentGroupData, low, high, target)

            if (targetFound) {
                this.updateCount(currentGroupKey)
                break
            }
        }
    }

    binarySearch = (groupArray, low, high, target) => {
        if (low > high) { return false }
        let mid = Math.floor( (low + high) / 2) ;
        if (target === groupArray[mid]) {
            return true;
        } else if (target < groupArray[mid]) {
            return this.binarySearch(groupArray, low, mid-1, target);
        } else if (target > groupArray[mid]) {
            return this.binarySearch(groupArray, mid+1, high, target);
        }
    }

    linearGroupsIteration = (target) => {
        let groupsObj = this.state.dataPackage.groups;
        let groupsEntries = Object.entries(groupsObj)

        for (let i=0; i<groupsEntries.length; i++) {
            let currentGroupKey = groupsEntries[i][0]
            let currentGroupData = groupsEntries[i][1]
            let targetFound = false

            for (let j=0; j<currentGroupData.length; j++) {
                targetFound = currentGroupData.includes(target)
                if (targetFound) {
                    this.updateCount(currentGroupKey)
                    break
                }
            }

            if (targetFound) { break }
        }

    }

    updateCount = (groupKey) => {
        let groupKeys = this.state.groupKeys
        let groupCounts = this.state.groupCounts

        for (let i=0; i<groupKeys.length; i++) {
            if (groupKey === groupKeys[i]) {
                groupCounts[i] = groupCounts[i] + 1
                break
            }
        }

        this.setState({ groupCounts: groupCounts })
    }

    updateTopStatus = () => {
        let groupCounts = this.state.groupCounts;
        let indexOfTopCount =
            groupCounts.reduce((i, previousCount, currentCount, arr) =>
                previousCount > arr[i] ? currentCount : i, 0);

        this.setState({
            groupValue: this.state.groupKeys[indexOfTopCount],
            countValue: groupCounts[indexOfTopCount],
        })
    }

    updateSpeed = (t0, t1) => {
        let timeTaken = t1 - t0;
        this.setState({ speedValue: parseInt(timeTaken) })
    }

    addToSpeedArray = (stateOption, t0, t1) => {
        let timeTaken = t1 - t0;
        if (stateOption === 'binary') {
            let binarySpeedAll = this.state.binarySpeedAll
            binarySpeedAll.push(timeTaken)
            this.setState({
                binarySpeedAll: binarySpeedAll ,
                binaryClickCount: this.state.binaryClickCount + 1
            })
        } else if (stateOption === 'linear') {
            let linearSpeedAll = this.state.linearSpeedAll
            linearSpeedAll.push(timeTaken)
            this.setState({
                linearSpeedAll: linearSpeedAll,
                linearClickCount: this.state.linearClickCount + 1
            })
        }
    }

    resetGroupCounts = () => {
        let groupCounts = this.state.groupCounts;
        for (let i=0; i<groupCounts.length; i++) { groupCounts[i] = 0 }
        this.setState({ groupCounts: groupCounts })
    }

    setData = () => {
        let groupsObj = testData.groups;
        let groupsEntries = Object.entries(groupsObj);
        let groupKeys = []
        let groupCounts = []

        groupsEntries.forEach(group => {
            groupKeys.push(group[0]);
            groupCounts.push(0)
        })

        this.setState({
            dataPackage: testData,
            groupKeys: groupKeys,
            groupCounts: groupCounts
        })

    }

    render() {
        return (
            <div className="App container">
                <h2>Find Group With Most Matched Sections</h2>
                <div className="searchButtons">
                    <DefaultButton
                        action={this.executeBinary}
                        text='Binary Search'
                    />
                    <DefaultButton
                        action={this.executeLinear}
                        text='Linear Search'
                    />
                </div>
                <Results
                    groupValue={this.state.groupValue}
                    countValue={this.state.countValue}
                    speedValue={this.state.speedValue}
                />
                <PerformanceAverages
                    binarySpeedAll={this.state.binarySpeedAll}
                    linearSpeedAll={this.state.linearSpeedAll}
                    binaryClickCount={this.state.binaryClickCount}
                    linearClickCount={this.state.linearClickCount}
                />
            </div>
        );
    }
}

export default App;
