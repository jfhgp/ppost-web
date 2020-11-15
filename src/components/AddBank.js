import React, { Component } from 'react';
import ApiCalls from '../service/RequestHandler';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

export default class AddBank extends Component {
  state = {};
  constructor() {
    super();
    this.currencies = [
      { label: 'Pakistani Rupee', value: 'PKR' },
      { label: 'US Dollar', value: 'USD' },
      { label: 'Euro', value: 'EUR' },
      { label: 'Australian Dollar', value: 'AUD' },
      { label: 'Saudi Riyal', value: 'SAR' }
    ];
  }

  async addBankAccont() {
    try {
      this.setState({ addbspinner: true });
      const params = {
        bank: this.state.bName,
        iban: this.state.bIBAN,
        currency: this.state.bCurrency,
        title: this.state.bTitle
      };
      const response = await ApiCalls.addBankAccont(params);
      if (response) {
        this.setState({ addbspinner: false, visibleBform: false });
        this.growl.show({
          severity: 'success',
          summary: 'Success Message',
          detail: 'Bank Account has been added successfully'
        });
      }
    } catch (error) {}
  }
  render() {
    return (
      <div>
        <Card>
          <div className="p-grid">
            <div className="p-col-12">
              <h3 style={{ textAlign: 'center' }}>Bank Account Info</h3>
            </div>
            <div className="p-col-3">
              <label htmlFor="acSimple">Bank Name</label>
            </div>
            <div className="p-col-9" style={{ marginBottom: '10px' }}>
              <InputText
                value={this.state.bName}
                onChange={e => this.setState({ bName: e.target.value })}
              />
            </div>
            <div className="p-col-3">
              <label htmlFor="acAdvanced">IBAN No</label>
            </div>
            <div className="p-col-9">
              <InputText
                value={this.state.bIBAN}
                onChange={e => this.setState({ bIBAN: e.target.value })}
              />
            </div>

            <div className="p-col-3">
              <label htmlFor="acAdvanced">Title</label>
            </div>
            <div className="p-col-9">
              <InputText
                value={this.state.bTitle}
                onChange={e => this.setState({ bTitle: e.target.value })}
              />
            </div>
          </div>
        </Card>
        <Card style={{ marginTop: '5%' }}>
          <div className="content-section implementation">
            <h3 style={{ textAlign: 'center' }}>Currency</h3>
            <Dropdown
              value={this.state.bCurrency}
              options={this.currencies}
              onChange={e => {
                this.setState({ bCurrency: e.value });
              }}
              style={{ width: '60%' }}
              placeholder="Select Currency"
            />
          </div>
        </Card>
        <Card style={{ marginTop: '5%' }}>
          <Button
            label="Add Bank Account"
            onClick={() => this.addBankAccont()}
          />
        </Card>
      </div>
    );
  }
}
