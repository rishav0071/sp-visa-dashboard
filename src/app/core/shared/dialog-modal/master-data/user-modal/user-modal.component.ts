import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription, finalize } from 'rxjs';
import { CONSTANTS_TEXT } from 'src/app/core/const/app.constant';
import { LocalstorageService } from 'src/app/core/service/localstorage.service';
import { UserService } from 'src/app/core/service/user.service';
import { ApiResponse } from 'src/app/core/shared/typings/app.typings';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit, OnDestroy {
  sub: boolean = false;
  spiner: boolean = false;
  form: FormGroup;
  loaderActive: boolean = false;
  subs$!: Subscription;

  selectedSubmissionFile: File | null = null;
  selectedRejectionFile: File | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserModalComponent>,
    private localstorage: LocalstorageService,
    public _UserService: UserService
  ) {}

  ngOnInit(): void {
    this.initilizationForm();
    if (this.data.data) {
      // Add a small delay to ensure form is fully initialized
      setTimeout(() => {
        this.patchFormWithNestedData(this.data?.data);
      }, 100);
    }
  }

  // Method to handle nested data pre-filling
  patchFormWithNestedData(userData: any) {
    console.log('Patching form with user data:', userData);

    // Patch basic fields
    this.form.patchValue({
      name: userData.name || '',
      email: userData.email || '',
      dob: userData.dob || '',
      submissionDate: userData.submissionDate || '',
      passport: userData.passport || '',
      trnNumber: userData.trnNumber || '',
      rejectionDate: userData.rejectionDate || '',
      fileStatus: userData.fileStatus || '',
      _id: userData._id || '',
    });

    // Patch address fields
    if (userData.address) {
      console.log('Patching address fields:', userData.address);
      this.form.patchValue({
        'address.street': userData.address.street || '',
        'address.city': userData.address.city || '',
        'address.state': userData.address.state || '',
        'address.postalCode': userData.address.postalCode || '',
        'address.country': userData.address.country || '',
      });
    } else {
      console.log('No address data found, trying flat fields');
      // Try to patch from flat fields as fallback
      this.form.patchValue({
        'address.street': userData['address.street'] || '',
        'address.city': userData['address.city'] || '',
        'address.state': userData['address.state'] || '',
        'address.postalCode': userData['address.postalCode'] || '',
        'address.country': userData['address.country'] || '',
      });
    }

    // Patch invoice details
    if (userData.invoiceDetails) {
      console.log('Patching invoice details:', userData.invoiceDetails);
      this.form.patchValue({
        'invoiceDetails.invoiceNumber':
          userData.invoiceDetails.invoiceNumber || '',
        'invoiceDetails.invoiceDate': userData.invoiceDetails.invoiceDate || '',
        'invoiceDetails.invoiceAmount':
          userData.invoiceDetails.invoiceAmount || 0,
        'invoiceDetails.businessPartner':
          userData.invoiceDetails.businessPartner || '',
        'invoiceDetails.issuingOffice':
          userData.invoiceDetails.issuingOffice || 'E-business',
      });
    } else {
      console.log('No invoice details found, trying flat fields');
      // Try to patch from flat fields as fallback
      this.form.patchValue({
        'invoiceDetails.invoiceNumber':
          userData['invoiceDetails.invoiceNumber'] || '',
        'invoiceDetails.invoiceDate':
          userData['invoiceDetails.invoiceDate'] || '',
        'invoiceDetails.invoiceAmount':
          userData['invoiceDetails.invoiceAmount'] || 0,
        'invoiceDetails.businessPartner':
          userData['invoiceDetails.businessPartner'] || '',
        'invoiceDetails.issuingOffice':
          userData['invoiceDetails.issuingOffice'] || 'E-business',
      });
    }

    // Patch receipt details
    if (userData.receiptDetails) {
      console.log('Patching receipt details:', userData.receiptDetails);
      this.form.patchValue({
        'receiptDetails.receiptNumber':
          userData.receiptDetails.receiptNumber || '',
        'receiptDetails.paymentDate': userData.receiptDetails.paymentDate || '',
        'receiptDetails.paymentMethod':
          userData.receiptDetails.paymentMethod || 'Online Payment',
        'receiptDetails.amountPaid': userData.receiptDetails.amountPaid || 0,
      });
    } else {
      console.log('No receipt details found, trying flat fields');
      // Try to patch from flat fields as fallback
      this.form.patchValue({
        'receiptDetails.receiptNumber':
          userData['receiptDetails.receiptNumber'] || '',
        'receiptDetails.paymentDate':
          userData['receiptDetails.paymentDate'] || '',
        'receiptDetails.paymentMethod':
          userData['receiptDetails.paymentMethod'] || 'Online Payment',
        'receiptDetails.amountPaid': userData['receiptDetails.amountPaid'] || 0,
      });
    }

    // Patch visa details
    if (userData.visaDetails) {
      console.log('Patching visa details:', userData.visaDetails);
      this.form.patchValue({
        'visaDetails.visaType': userData.visaDetails.visaType || '',
        'visaDetails.visaCategory': userData.visaDetails.visaCategory || '',
      });
    } else {
      console.log('No visa details found, trying flat fields');
      // Try to patch from flat fields as fallback
      this.form.patchValue({
        'visaDetails.visaType': userData['visaDetails.visaType'] || '',
        'visaDetails.visaCategory': userData['visaDetails.visaCategory'] || '',
      });
    }

    console.log('Form values after patching:', this.form.value);
  }

  ngOnDestroy() {
    if (this.subs$) {
      this.subs$.unsubscribe();
    }
  }

  initilizationForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required]],
      submissionDate: ['', [Validators.required]],
      passport: ['', [Validators.required]],
      trnNumber: ['', [Validators.required]],
      rejectionDate: [''], // optional
      fileStatus: [''], // optional
      submissionFile: [''], // file handled separately
      rejectionFile: [''], // file handled separately
      _id: [''],

      // Address fields
      'address.street': [''],
      'address.city': [''],
      'address.state': [''],
      'address.postalCode': [''],
      'address.country': [''],

      // Invoice details
      'invoiceDetails.invoiceNumber': [''],
      'invoiceDetails.invoiceDate': [''],
      'invoiceDetails.invoiceAmount': [0],
      'invoiceDetails.businessPartner': [''],
      'invoiceDetails.issuingOffice': ['E-business'],

      // Receipt details
      'receiptDetails.receiptNumber': [''],
      'receiptDetails.paymentDate': [''],
      'receiptDetails.paymentMethod': ['Online Payment'],
      'receiptDetails.amountPaid': [0],

      // Visa details
      'visaDetails.visaType': [''],
      'visaDetails.visaCategory': [''],
    });
    this.spiner = false;
  }

  get f(): any {
    return this.form.controls;
  }

  onFileChange(event: Event, type: 'submission' | 'rejection') {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      if (type === 'submission') {
        this.selectedSubmissionFile = input.files[0];
      } else {
        this.selectedRejectionFile = input.files[0];
      }
    }
  }

  onSubmit() {
    this.sub = true;
    if (this.form.invalid) return;

    const payload = { ...this.form.value };
    const formData = new FormData();

    // Append form fields (excluding file controls)
    for (const key in payload) {
      if (key !== 'submissionFile' && key !== 'rejectionFile') {
        formData.append(key, payload[key]);
      }
    }

    // Append files if present
    if (this.selectedSubmissionFile) {
      formData.append('submissionFile', this.selectedSubmissionFile);
    }
    if (this.selectedRejectionFile) {
      formData.append('rejectionFile', this.selectedRejectionFile);
    }

    this.sendApidata(formData, payload._id);
  }

  sendApidata(formData: FormData, id?: string) {
    this.loaderActive = true;

    const request$ = id
      ? this._UserService.updateUser(formData, id)
      : this._UserService.createdUser(formData);

    this.subs$ = request$
      .pipe(finalize(() => (this.loaderActive = false)))
      .subscribe((res: ApiResponse) => {
        if (res.status) {
          this.dialogRef.close({
            status: true,
            data: res.data,
            type: CONSTANTS_TEXT.createUser,
          });
          this.localstorage.showMessage(CONSTANTS_TEXT.success, res.status);
        }
      });
  }
}
